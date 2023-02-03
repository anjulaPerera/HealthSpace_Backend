const { Donor } = require("../models/AdminModel");

exports.registerDonor = (req,res)=>{

    const donor = new Donor(req.body);

    donor.save((err,doc)=>{
    
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

exports.loginDonor=(req,res)=>{
    Donor.findOne({email:req.body.email},(err,donor)=>{
        if(!donor){
            return res.status(404).json({
                success:false,
                message:"User email not found!"
            });
        }
        donor.comparePassword(req.body.password,(err,isMatch)=>{
            if(!isMatch){
                return res.status(400).json({
                    success:false,
                    message:"Password is incorrect!"
                });
            }
            donor.generateToken((err,token)=>{
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
