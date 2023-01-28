const { Patient } = require("../models/PatientModel");

exports.registerPatient = (req,res)=>{
    const patient = new Patient(req.body);

    patient.save((err,doc)=>{
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

exports.loginPatient=(req,res)=>{
    Patient.findOne({email:req.body.email},(err,patient)=>{
        if(!patient){
            return res.status(404).json({
                success:false,
                message:"User email not found!"
            });
        }
        patient.comparePassword(req.body.password,(err,isMatch)=>{
            if(!isMatch){
                return res.status(400).json({
                    success:false,
                    message:"Password is incorrect!"
                });
            }
            patient.generateToken((err,token)=>{
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

