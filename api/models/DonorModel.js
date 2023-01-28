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
        required:[true,'Name field is required!'],
        maxlength:100
    },
    nic:{
        type:String,
        required:[true,'NIC field is required!'],
        maxlength:20
    },
    address:{
        type:String,
        required:[true,'Address field is required!'],
        maxlength:100
    },
    gender:{
        type:String,
        required:[true,'Gender field is required!'],
        maxlength:20,
        enum: Gender,
    },
    dob:{
        type:Date,
        required:[true,'Gender field is required!']
    },
    age:{
        type:String,
        required:[true,'Gender field is required!'],
        maxlength:20
    },
    weight:{
        type:String,
        required:[true,'Weight field is required!'],
        maxlength:20
    },
    blood_group:{
        type:String,
        required:[true,'Gender field is required!'],
        maxlength:20,
        enum : BloodGroup
        //<-----------***********DROPDOWN**********-------------->
    },
    expected_donation:{
        type:String,
        required:[true,'Gender field is required!'],
        maxlength:100
    },
    email:{
        type:String,
        required:[true,'Email field is required!'],
        unique:true
    },
    phone_number:{
        type:String,
        required:[true,'Phone number field is required!']
    },
    subordinate_contact:{
        type:String,
        required:[true,'Subordinate contact field is required!']
    },
    role:{
        type:String,
        enum:UseRole.DONOR,
        required:[true,'User role field is required!'],
        default : UseRole.DONOR
        
    },
    password:{
        type:String,
        required:[true,'Password field is required!'],
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