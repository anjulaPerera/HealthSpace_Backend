var mongoose = require("mongoose");
var bcrypt = require('bcrypt');
require("dotenv").config();
const jwt = require('jsonwebtoken');
const UseRole=require("../enums/UseRole");


const SALT = 10;

var Schema = mongoose.Schema;

var AdminSchema = new Schema({
    id:{
        type : mongoose.Schema.Types.ObjectId
    },
    name:{
        
        type:String,
        required:[false,'Name field is required!'],
        maxlength:100
    },
    username:{
        type:String,
        required:[false,'Email field is required!'],
        unique:false
    },
   
    role:{
        type:String,
        enum:UseRole.ADMIN,
        required:[false,'User role field is required!'],
        default : UseRole.ADMIN
        
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
AdminSchema.pre('save',function(next){
    var admin=this;
    if(admin.isModified('password')){
        //checking if password field is available and modified
        bcrypt.genSalt(SALT,function(err,salt){
            if(err) return next(err)

            bcrypt.hash(admin.password,salt,function(err,hash){
                if(err) return next(err)
                admin.password=hash;
                next();
            });
        });
    }else{
        next();
    }
});

//For comparing the users entered password with database duing login
AdminSchema.methods.comparePassword=function(candidatePassword,callBack){
    bcrypt.compare(candidatePassword,this.password,function(err,isMatch){
        if(err) return callBack(err);
        callBack(null,isMatch);
    });
};

//For generating token when loggedin
AdminSchema.methods.generateToken=function(callBack){
    var admin=this;
    var token=jwt.sign(admin._id.toHexString(),process.env.SECRETE);

    callBack(null,token);
};

//Validating token for auth routes middleware
AdminSchema.statics.findByToken=function(token,callBack){
    jwt.verify(token,process.env.SECRETE,function(err,decode){
        //This decode must give user_id if token is valid.ie decode=user_id
        Admin.findById(decode,function(err,admin){
            if(err){
                resizeBy.json({status:false,date:"Invalid User ID"});
            }
            callBack(null,admin);
        });
    });
};   

const Admin = mongoose.model('Admin',AdminSchema);
module.exports = {Admin};