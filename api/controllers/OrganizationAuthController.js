const {Organization}=require("../models/OrganizationModel");

exports.registerOrganization = (req,res)=>{
    const organization = new Organization(req.body);

    organization.save((err,doc)=>{
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

exports.loginOrganization=(req,res)=>{
    Organization.findOne({email:req.body.email},(err,organization)=>{
        if(!organization){
            return res.status(404).json({
                success:false,
                message:"User email not found!"
            });
        }
        organization.comparePassword(req.body.password,(err,isMatch)=>{
            if(!isMatch){
                return res.status(400).json({
                    success:false,
                    message:"Password is incorrect!"
                });
            }
            organization.generateToken((err,token)=>{
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

// exports.getOrganizationDetails= (req, res) => {
//     res.json({status: true, message: "User Received!", data: req.Organization});
// };

// //Organization
// exports.registerOrganization = (req,res)=>{
//     const Organization = new ShedOwner(req.body);

//     Organization.save((err,doc)=>{
//         if(err){
//             return res.status(422).json({
//                 success:false,
//                 message:"Registration failed, Check the validation errors!",
//                 data:err
//             });
//         }else{
//             return res.status(200).json({
//                 success:true,
//                 message:"Successfully Registered!"
//             });
//         }
//     });
// }

// exports.loginShedOwner=(req,res)=>{
//     ShedOwner.findOne({email:req.body.email},(err,shedowner)=>{
//         if(!shedowner){
//             return res.status(404).json({
//                 success:false,
//                 message:"User email not found!"
//             });
//         }
//         shedowner.comparePassword(req.body.password,(err,isMatch)=>{
//             if(!isMatch){
//                 return res.status(400).json({
//                     success:false,
//                     message:"Password is incorrect!"
//                 });
//             }
//             shedowner.generateToken((err,token)=>{
//                 if(err){
//                     return res.status(400).json({
//                         success:false,
//                         message:"Unable to generate jwt key!",
//                         data:err
//                     });
//                 }
//                 return res.status(200).json({
//                     success:true,
//                     message:"Successfully Logged In!",
//                     data:{
//                         "token":token
//                     }
//                 });
//             });
            
//         });
//     });
// }

// exports.getShedOwnerDetails= (req, res) => {
//     res.json({status: true, message: "User Received!", data: req.shedowner});
// };