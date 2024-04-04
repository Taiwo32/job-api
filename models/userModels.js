const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require ('bcryptjs');
const crypto = require ('crypto')

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
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false
    },
    active: {
        type: Boolean,
        default: true,
        select: false,
    },
    passwordChangedAt: Date, 

    passwordResetToken: String,  

    passwordResetExpires: Date, 
});

// this is the middle ware to hash the password on the data base 
userSchema.pre('save',async function(next){
    if(!this.isModified('password')) return next()

    this.password = await bcrypt.hash(this.password, 12)

    this.passwordConfirm = undefined

    next();
});

userSchema.pre("save",function (next){
    if (!this.isModified('password')|| this.isNew) return next();  // checking if it is a new document do not run the middleware
    this.passwordChangedAt = Date.now() - 1000; 
    next();  
})

userSchema.methods.correctPassword = async function(   // this is called an instance  we use this to check if the password is correct
    candidatePassword,  // the password you inputted
    userPassword // and the password that is on the DB
){
    return await bcrypt.compare(candidatePassword,userPassword);  // it compares the password inputted and the password on our DB
};


userSchema.methods.changedPasswordAfter = function(JWTTimestamp){  
    if(this.passwordChangedAt){
        const changedTimestamp = parseInt( 
            this.passwordChangedAt.getTime() / 1000,  
         10
        );
        console.log(this.passwordChangedAt, JWTTimestamp);
        return JWTTimestamp < changedTimestamp;  
    }

    // false means not changed
    // return false;
};

userSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString("hex") // crypto is used to create a random token and it is provided by node jS we don't need to install it just require it
    this.passwordResetToken = crypto 
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    console.log({resetToken},this.passwordResetToken);
    
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
    return resetToken; 
}



const use = mongoose.model('use',userSchema);
module.exports = use