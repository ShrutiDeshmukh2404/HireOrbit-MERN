import mongoose from "mongoose";
const userSchema=new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phonenumber:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        emum:['Freelancer','Recruiter'],
        default:'Freelancer',
        required:true
    },
    profile:{
        description:{type:String},
        gig:{type:String},
        keywords:{type:String},
        document:{type:String},//URL to documents
        documentOriginalName:{type:String},
        recruiter:{type:mongoose.Schema.Types.ObjectId, ref:'Job'}, 
        profilePhoto:{
            type:String,
            default:'default.jpg',
        },

    },

},
{timestamps:true});
export const User=mongoose.model('User',userSchema);
