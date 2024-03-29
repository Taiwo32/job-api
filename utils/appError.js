class AppError extends Error {
    constructor(message,statusCode){
        super(message);

        this.statusCode = statusCode;
        this.status = `$(statuscode)`.startsWith('4')? 'fail' : "error";  // just like an if and else statement it is called ternary operator
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}
module.exports = AppError;