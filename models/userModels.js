const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = new mongoose.Schema({
    fName: {
        type: String,
        required:[true, 'Please tell us your first name'],
        minlength: 3,
    },
    lName: {
        type: String,
        required:[true, 'Please provide your last name'],
    },
    
    email: {
        type: String,
        required:[true, 'please provide your email address'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'please provide a valid email!']
    },
    password: {
        type: String,
        required:[true, 'please provide your password'],
        unique: true,
        minlength: 5,
        maxlength: 20,
        select: false, // don"t want to show on postman
    },
    passwordConfirm:{
        type: String,
        required: [true, 'please confirm your password'],
        validate: {
            // this is only works on create and save 
            validator: function(el) { // el means element 
                return el === this.password
            },
            message: 'Password does not match',
        },

    },
    role: {
        type: String,
        enum: ['user','admin', 'hr' ],  // a validator to check if what you sent is part of the parameter in the line
        default: "user", // default role to user 
    },
});