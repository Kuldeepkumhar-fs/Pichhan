const errorHandler = async (req,res, statusCode, errorMessage, description) => {
    console.log('sending response from error handler.......    ');
    console.log('statusCode.......    ', statusCode);
    console.log('errorMessage.......    ', errorMessage);

    res.status(statusCode).json({
        success: false,
        statusCode: statusCode,
        apiName:req.originalUrl,
        message: errorMessage,
        description: description
    })
}

module.exports = {errorHandler}