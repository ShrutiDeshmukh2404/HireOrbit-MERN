import {User} from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

export const register = async(req,res)=>{
    try {
         const {fullname,email,phonenumber,password,role} = req.body;
         if(!fullname || !email || !phonenumber || !password || !role){
            return res.status(400).json({
                message:"Please fill all the fields",
            success:false
            });
         };
         const user = await User.findOne({email});
         if(user){
            return res.status(400).json({
                message:"Email already exists",
                success:false,
            });
         }
         const hashedPassword = await bcrypt.hash(password, 10);

         await User.create({
            fullname,
            email,
            phonenumber,
            password:hashedPassword,
            role
         })
         return res.status(201).json({
            message:"Welcome, let's get working",
            success:true
        });
    } catch (error) {
        console.log(error);
    }
}
export const login = async(req, res)=> {
    try {
        const { email, password, role } = req.body;
        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Please fill all the fields",
                success: false
            });
        };
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect email or password",
                success: false,
            });
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect email or password",
                success: false,
            });
        }

        const tokenData = {
            userId: user._id
        };
        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phonenumber: user.phonenumber,
            profile: user.profile
        };

        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpsOnly: true, sameSite: 'strict' }).json({
            message: "Login Successfull",
            success: true
        });
    } catch (error) {
        console.log(error);

    }
}
export const logout = async (req,res)=>{
    try {
        return res.status(200).cookie("token","",{maxAge:0}).json({
            message:"Logged out Successfully",
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}

export const updateProfile = async (req,res)=>{
    try {
        const {fullname, email, phonenumber, bio, skills} = req.body;
        const file = req.file;
        
           

         //cloudinary
         let skillsArray;
         if(skills){
            skillsArray = skills.split(",");

         }
         
         const userId = req.id;//middleware authentication
         let user = await User.findById(userId);

         if(!user){
            return res.status(400).json({
                message:"User not found",
                success:false
                });
         }
         if(fullname) user.fullname=fullname
         if(email) user.email=email
         if(phonenumber) user.phonenumber=phonenumber
         if(bio) user.profile.bio = bio
         if(skills) user.profile.skills = skillsArray
         
        
        
        
         //resume

         await user.save();
         user = {
            _id:user._id,
            fullname:user.fullname,
            email:user.email,
            phonenumber:user.phonenumber,
            profile:user.profile
         }
         return res.status(200).json({
            message:"Profile updated successfully",
            user,
            success:true
         })


        
    } catch (error) {
        console.log(error);  
    }
}
export const getUserById = async (req,res) =>{
    try {
        const userId = req.params.id;//middleware authentication
        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({
                message:"user not found",
                success:false
            })
          
        }
        return res.status(200).json({
            user,
            success:true
        })
        
    } catch (error) {
        console.log(error);
        
    }
}
