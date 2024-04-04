// const { ObjectId } = require('bson')
const mongoose = require('mongoose')


const jobSchema = new mongoose.Schema({
    company: {
        type: String,
        required: [true, 'Please provide a company name'],
        unique: true,
        minlength: 5,
        maxlength: 50
    },
    position:{
        type: String,
        required: [true,'Please provide a position'],
    },
    status:{
        type: String,
        enum: ['Active','Inactive' ],  
        default: "Active", 
    },
    link:{
        type: String,
        required: [true, "Please provide the url to the job"]
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false
    },
    // createdBy: {
    //     type: mongoose.Types.ObjectId,
    //     ref: "User",
    //     required: [true, "hgcvytgfvuyfvuy"]
    // }
});
const job = mongoose.model('job', jobSchema)

module.exports = job