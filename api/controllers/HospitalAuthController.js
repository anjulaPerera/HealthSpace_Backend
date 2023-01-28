const { Hospital } = require("../models/HospitalModel");

exports.registerHospital = (req,res)=>{
    const hospital = new Hospital(req.body);

    hospital.save((err,doc)=>{
        if(err){
            return res.status(422).json({
                success:false,
                message:"Registration failed, Check the validation errors!",
                data:err
            });
        }else{
            return res.status(200).json({
                success:true,
                message:"Successfully Registered!"
            });
        }
    });
}

exports.loginHospital=(req,res)=>{
    Hospital.findOne({email:req.body.email},(err,hospital)=>{
        if(!hospital){
            return res.status(404).json({
                success:false,
                message:"User email not found!"
            });
        }
        hospital.comparePassword(req.body.password,(err,isMatch)=>{
            if(!isMatch){
                return res.status(400).json({
                    success:false,
                    message:"Password is incorrect!"
                });
            }
            hospital.generateToken((err,token)=>{
                if(err){
                    return res.status(400).json({
                        success:false,
                        message:"Unable to generate jwt key!",
                        data:err
                    });
                }
                return res.status(200).json({
                    success:true,
                    message:"Successfully Logged In!",
                    data:{
                        "token":token
                    }
                });
            });
            
        });
    });
}
