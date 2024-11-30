import { application } from "express";
import mongoose from "mongoose";
const jobSchema = new mongoose.Schema({
    recruiterName:{
        type:String,
        required:true
    },
    jobTitle: {
        type: String,
        required: true
    },
    website:{
        type:String, 
    },
    logo:{
        type:String,
        default:'default.jpg',
    },
    description: {
        type: String,
        required: true
    },
    requirements: [{
        type: String

    }],
    Amount: {
        type: Number,
        required: true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    application: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Application',
        }

    ]
},{timestamps:true});
export const Job=mongoose.model("Job",jobSchema);