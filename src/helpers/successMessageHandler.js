const successMessageHandler = async (req, res, statusCode, data, successMessage) => {
    console.log('sending response from successMessageHandler.......    ');
    console.log('statusCode.......    ', statusCode);
    console.log('successMessageHandler.......    ', successMessage);

    res.status(statusCode).json({
        success: false,
        statusCode: statusCode,
        data: data,
        message: successMessage
    })
}

module.exports = { successMessageHandler }