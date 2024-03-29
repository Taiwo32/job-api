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

    const {company, position, status} = req.body

    const newJob = await Job.create({company,position,status});
    res.status(201).json({
        status: 'success',
        data:{
            job: newJob,
        },
    });
});

exports.getOneJobsById = catchAsync(async(req, res, next)=>{
    const job = await Job.findById()
    if(!job){
        return next(new AppError('No article found with that title', 400));
    }
    res.status(200).json({
        status: 'success',
        data:{
            job,
        },
    });
})