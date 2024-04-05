const Job = require ('../models/jobModels');
const AppError = require ('../utils/appError');
const catchAsync = require ('../utils/catchAsync');

exports.getAllJobs = catchAsync(async(req, res, next)=>{
    const jobs = await Job.find() 
    res.status(200).json({
        status: 'success',
        result: jobs.length,
        data: {
            jobs
        }

    })
}); 

exports.createJob = catchAsync(async(req, res, next)=>{

    const {company, position, status, link,} = req.body

    const newJob = await Job.create({company,position,status, link,});
    res.status(201).json({
        status: 'success',
        data:{
            job: newJob,
        },
    });
    
});

exports.getOneJob = catchAsync(async(req, res, next)=>{
    const job = await Job.findById(req.params.id)
    if(!job){
        return next(new AppError('No Job found with that ID', 400));
    }
    res.status(200).json({
        status: 'success',
        data:{
            job,
        },
    });
    
});

exports.updateJob = catchAsync (async (req,res,next)=>{
    const job = await Job.findByIdAndUpdate(req.params.id, req.body,{
        new: true,
        runValidators:true,
    });
    if(!job){
        return next(new AppError('No Job found with that ID',400));
    }

    
    res.status(200).json({
        status: "success",
        data:{
            job,
        },
    });
    
});
exports.deleteJob = catchAsync (async (req,res, next)=>{
    const job = await Job.findByIdAndDelete(req.params.id);
        if(!job){
            return next(new AppError('No Job found with that ID', 401));
        }
        res.status(204).json({
            status: "success",
            data: null,
        });
        
});