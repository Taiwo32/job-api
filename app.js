const express = require ('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const jobRouter = require ('./routes/jobRoute');
const AppError = require ('./utils/appError');
const app = express()
app.use(bodyParser.json());

app.use(morgan("dev")); 
//routes
app.use('/api/v1/job',jobRouter)

app.all('*',(req,res, next)=>{  //* means get all 
    next(new AppError(`Can't find ${req.originalUrl}on this server`,404));
});
//server //
module.exports = app;