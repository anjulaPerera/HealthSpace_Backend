var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var PostSchema=new Schema({
    title:{
        type:String,
        required:[true,'Name field is required!'],
        maxlength:100
    },
    description:{
        type:String,
        required:[true,'Description field is required!'],
        maxlength:300
    },
    profile_image: {
        type: String,
        required: false
    },
    // patient_name:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:'Patient',
    //     required:[true,'Patient field is required!']
    // },
    created_date:{
        type:Date,
        default:Date.now
    },
    city : {
        type:String
    }

});



const Post=mongoose.model('Post',PostSchema);
module.exports={Post};