const express = require ('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');



const rateLimit = require('express-rate-limit');
const helmet = require('helmet'); // 
const mongoSanitize = require('express-mongo-sanitize');


const cors = require('cors');



const jobRouter = require ('./routes/jobRoute');
const userRouter = require ('./routes/userRoute');
const AppError = require ('./utils/appError')
const globalErrorHandler = require('./controllers/errorController');











const app = express()
app.use(bodyParser.json());
// app.enable('trust proxy');





// set security http headers
app.use(helmet())

// implement CORS 
app.use(cors());
// access-control-allow-origin * 
app.options("*",cors());




app.use(morgan("dev")); 

// limit request from same ip

const limiter = rateLimit({
    max: 100,  // amount of request you can makes is 100 in 60 minute
    windowMs: 60 * 60 * 1000,
    message: "Too many request from thus IP, please try again in an hour",
});
app.use('/api', limiter) // use this end pointer 

app.use(mongoSanitize());


//routes
app.use('/api/v1/job',jobRouter)
app.use('/api/v1/user', userRouter)

app.use(globalErrorHandler);


app.all('*',(req,res, next)=>{  //* means get all 
    next(new AppError(`Can't find ${req.originalUrl}on this server`,404));
});
//server //
module.exports = app;