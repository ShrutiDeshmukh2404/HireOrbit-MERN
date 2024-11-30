import {Job} from "../models/job.model.js";

//admin
export const postJob = async(req,res)=>{
    try {
        const {recruiterName, jobTitle, website, logo, description,requirements,Amount}=req.body;
        const userId = req.id;

        if(!recruiterName || !jobTitle ||  ! website  ||  !logo || !description || !requirements || !Amount ){
            return res.status(400).json({
                message: "Please fill in all fields",
                success:false
            })
        };
        const job =await Job.create({
            recruiterName,
            jobTitle,
            website, 
            logo, 
            description,
            requirements:requirements.split(",") ,
            Amount:Number(Amount),
            userId: userId,
            created_by:userId,
            
        });
        return res.status(201).json({
            message: "Job posted successfully",
            job,
            success:true
        });
    } catch (error) {
        console.log(error);
        
    }
}

//job applicant
export const getAllJobs = async (req,res) =>{
    try {
        const keyword =req.query.keyword || "";
        const query = {
            $or:[
                {jobtTitle:{$regex:keyword, $options:"i"}},
                {description:{$regex:keyword, $options:"i"}},
            ]
        };
        const jobs = await Job.find(query).populate({
            path:"userId",
        }).sort({
            createdAt: -1
        });
        if(!jobs){
            return res.status(404).json({
                message: "No jobs found",
                success:false
            })
        };
        return res.status(200).json({
            jobs,
            success:true
        })

    } catch (error) {
        console.log(error);
        
    }
}

//job applicant
export const getJobById = async (req,res) =>{
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId);
        if(!job){
            return res.status(404).json({
                message: "Job not found",
                success:false
            })
        };
        return res.status(200).json({job, success:true});
        
    } catch (error) {
        console.log(error);
        
    }
}

//admin job creation
export const getAdminJobs = async(req,res) =>{
    try {
        const adminId = req.id;
        const jobs = await Job.find({created_by:adminId});
        if(!jobs){
            return res.status(404).json({
                message: "Job not found",
                success:false
            })
        };
        return res.status(200).json({
            jobs, 
            success:true
        });
        
    } catch (error) {
        console.log(error);
        
    }
}