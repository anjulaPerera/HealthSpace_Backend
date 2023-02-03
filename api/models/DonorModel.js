var mongoose = require("mongoose");
var bcrypt = require('bcrypt');
require("dotenv").config();
const jwt = require('jsonwebtoken');
const UseRole=require("../enums/UseRole");
const BloodGroup = require("../enums/BloodGroup");
const Gender = require("../enums/Gender");

const SALT = 10;

var Schema = mongoose.Schema;

var DonorSchema = new Schema({
    id:{
        type : mongoose.Schema.Types.ObjectId
    },
    name:{
        type:String,
        required:[false,'Name field is required!'],
        maxlength:100
    },
    nic:{
        type:String,
        required:[false,'NIC field is required!'],
        maxlength:20
    },
    address:{
        type:String,
        required:[false,'Address field is required!'],
        maxlength:100
    },
    gender:{
        type:String,
        required:[false,'Gender field is required gggggggggg!'],
        maxlength:20,
        enum: Gender,
    },

    age:{
        type:String,
        required:[false,'Age field is required!'],
        maxlength:20
    },
    weight:{
        type:String,
        required:[false,'Weight field is required!'],
        maxlength:20
    },
    blood_group:{
        type:String,
        required:[false,'Blood group field is required!'],
        maxlength:20,
        enum : BloodGroup
        //<-----------***********DROPDOWN**********-------------->
    },
    expected_donation:{
        type:String,
        required:[false,'Donation field is required!'],
        maxlength:100
    },
    nearest_hospital:{
        type:String,
        required:[false,'Nearest hospital field is required!'],
        maxlength:100
    },
    email:{
        type:String,
        required:[false,'Email field is required!'],
        unique:false
    },
    phone_number:{
        type:String,
        required:[false,'Phone number field is required!']
    },
    subordinate_contact:{
        type:String,
        required:[false,'Subordinate contact field is required!']
    },
    role:{
        type:String,
        enum:UseRole.DONOR,
        required:[false,'User role field is required!'],
        default : UseRole.DONOR
        
    },
    password:{
        type:String,
        required:[false,'Password field is required!'],
        minlength:5
    },
    create_date:{
        type:Date,
        default:Date.now
    }
});

//Saving user data
DonorSchema.pre('save',function(next){
    var donor=this;
    if(donor.isModified('password')){
        //checking if password field is available and modified
        bcrypt.genSalt(SALT,function(err,salt){
            if(err) return next(err)

            bcrypt.hash(donor.password,salt,function(err,hash){
                if(err) return next(err)
                donor.password=hash;
                next();
            });
        });
    }else{
        next();
    }
});

//For comparing the users entered password with database duing login
DonorSchema.methods.comparePassword=function(candidatePassword,callBack){
    bcrypt.compare(candidatePassword,this.password,function(err,isMatch){
        if(err) return callBack(err);
        callBack(null,isMatch);
    });
};

//For generating token when loggedin
DonorSchema.methods.generateToken=function(callBack){
    var donor=this;
    var token=jwt.sign(donor._id.toHexString(),process.env.SECRETE);

    callBack(null,token);
};

//Validating token for auth routes middleware
DonorSchema.statics.findByToken=function(token,callBack){
    jwt.verify(token,process.env.SECRETE,function(err,decode){
        //This decode must give user_id if token is valid.ie decode=user_id
        Donor.findById(decode,function(err,donor){
            if(err){
                resizeBy.json({status:false,date:"Invalid User ID"});
            }
            callBack(null,donor);
        });
    });
};   

const Donor = mongoose.model('Donor',DonorSchema);
module.exports = {Donor};