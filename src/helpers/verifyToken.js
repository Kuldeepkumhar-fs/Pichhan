const jwt = require('jsonwebtoken');
const { errorHandler } = require('./errorHandler');



module.exports = async function (req, res, next) {
    console.log('req at verify Token    =======     ', req)
    console.log('request header at verify Token ===  ', req.header('authorization'))
    let splitTokenString = req.header('authorization')?.split(' ')
    let actualToken = splitTokenString[1]

    try {
        jwt.verify(actualToken, process.env.JWT_TOKEN_KEY, function (err, decoded) {
            if (err) {
                console.log('error while token decoding === ', err)
                errorHandler(req,res, 401, 'Token invalid or expired')
            } else {
                console.log('Token decoded result  ===   ', decoded)
                req.decodedTokenDetails = decoded
                console.log('Now handling next part of request ====   ', req)
                next()
            }

        });
    } catch (err) {
        console.log('error catched while verifying token ====   ', err)
        errorHandler(req,res, 500, 'Internal server error .', err)
    }
}
