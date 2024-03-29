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
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: "user",
        required: [true, ""]
    }
});
const job = mongoose.model('job', jobSchema)

module.exports = job