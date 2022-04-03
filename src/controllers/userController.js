const User = require('../models/userModel')
const validator = require('validator')
const Joi = require('joi');
const { errorHandler } = require('../helpers/errorHandler');
const CryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken');
const verifyToken = require('../helpers/verifyToken');
const { successMessageHandler } = require('../helpers/successMessageHandler');



// Register a user
exports.registerUser = async (req, res, next) => {

    console.log('req at   registerUser controller  ===  ', req);
    console.log('req at registerUser controller req.body ===  ', req.body);

    const { name, emailId, password, role } = req.body;

    try {
        console.log('validator.isEmail(req.body.emailId) ===  ', validator.isEmail(req.body.emailId));

        if (name == '') {
            errorHandler(req, res, 422, 'Name is required .')
        } else if (emailId == '' || !validator.isEmail(req.body.emailId)) {
            errorHandler(req, res, 422, 'Please enter valid email Id .')
        } else if (password == '' || password.length < 6) {
            errorHandler(req, res, 422, 'Please enter a valid atleast 6 character password .')
        } else if (role == '') {
            errorHandler(req, res, 422, 'Please select valid user role .')
        }
        let emailExistsInDB = await User.findOne({ emailId: req.body.emailId })
        let nameExistsInDB = await User.findOne({ name: req.body.name })
        console.log('emailExistsInDB   ===   ', emailExistsInDB)

        if (nameExistsInDB) {
            errorHandler(req, res, 409, 'User name already exists.')
        } else if (emailExistsInDB) {
            errorHandler(req, res, 409, 'Email already exists.')
        } else {
            const user = await User.create({
                name,
                emailId,
                password: CryptoJS.AES.encrypt(password, process.env.PASSWORD_ENCODING_KEY).toString(),
                role,
            })
            console.log('stored user data  ====   ', user)
            let data = user
            // res.status(201).json({
            //     success: true,
            //     statusCode: 200,
            //     data: user,
            //     message: 'User registered successfully .'
            // })
            successMessageHandler(req, res, 200, data, 'User registered successfully .')
        }
    } catch (err) {
        console.log('error catched at catched block    ====   ', err)
        errorHandler(req, res, 500, 'Internal server error .', err)
    }
}

// login a user
exports.loginUser = async (req, res, next) => {

    // console.log('req at registerUser controller  ===  ', req);
    const { emailId, password } = req.body;

    try {
        if (emailId == '' || !validator.isEmail(req.body.emailId)) {
            errorHandler(req, res, 422, 'Please enter valid email Id .')
        } else if (password == '' || password.length < 6) {
            errorHandler(req, res, 422, 'Please enter a valid atleast 6 character password .')
        }
        let emailExistsInDB = await User.findOne({ emailId: req.body.emailId })

        if (emailExistsInDB) {

            console.log('emailExistsInDB   ===   ', emailExistsInDB.toObject())
            console.log('Data in DB   ===   ', emailExistsInDB.toObject()._id.toString())

            let hashPassword = emailExistsInDB._doc.password
            let decodedPassword = CryptoJS.AES.decrypt(hashPassword, process.env.PASSWORD_ENCODING_KEY).toString(CryptoJS.enc.Utf8)
            console.log('decodedPassword   ===   ', decodedPassword)

            if (password == decodedPassword) {

                let access_token = jwt.sign({ userId: emailExistsInDB.toObject()._id.toString() }, process.env.JWT_TOKEN_KEY, { expiresIn: '2d' })

                console.log('access_token    ===   ', access_token)
                let data = { ...emailExistsInDB._doc, access_token: access_token }

                // res.status(201).json({
                //     success: true,
                //     statusCode: 201,
                //     data: { ...emailExistsInDB._doc, access_token: access_token },
                //     message: 'Logged in successfully .'
                // })
                successMessageHandler(req, res, 201, data, 'Logged in successfully .')

            } else {
                errorHandler(req, res, 401, 'Invalid email or password .')
            }
        } else {
            errorHandler(req, res, 404, 'User not found.')
        }
    } catch (err) {
        console.log('error catched at catched block    ====   ', err)
        errorHandler(req, res, 500, 'Internal server error .', err)
    }

}


exports.getUserProfileDetails = async (req, res, next) => {
    console.log('request received for get profile details ===  ', req)
    try {
        User.findById(req.decodedTokenDetails.userId, function (err, user) {
            if (err) {
                console.log('Db error for get profile api  ==  ', err)
                errorHandler(req, res, 500, 'Internal server error .', err)
            } else if (!user) {
                console.log('@@@@  Db response for get profile api  ==  ', user)
                errorHandler(req, res, 404, 'User not found.', err)
            } else {
                console.log('Db response for get profile api  ==  ', user)
                // res.status(201).json({
                //     success: true,
                //     statusCode: 201,
                //     data: user._doc,
                // })
                let data = user._doc
                successMessageHandler(req, res, 201, data)

            }

        })
    } catch (err) {
        console.log('error catched at get profile details api    ====   ', err)
        errorHandler(req, res, 500, 'Internal server error .', err)
    }
}

exports.editUserProfile = async (req, res, next) => {
    console.log('request received for get profile details ===  ', req)
    try {
        User.findById(req.decodedTokenDetails.userId, function (err, user) {
            if (err) {
                console.log('Db error for get profile api  ==  ', err)
                errorHandler(req, res, 500, 'Internal server error .', err)
            } else if (!user) {
                console.log('@@@@  Db response for get profile api  ==  ', user)
                errorHandler(req, res, 404, 'User not found.', err)
            } else {
                console.log('Db response for get profile api  ==  ', user)
                // res.status(201).json({
                //     success: true,
                //     statusCode: 201,
                //     data: user._doc,
                // })
                let data = user._doc
                successMessageHandler(req, res, 201, data)
            }

        })
    } catch (err) {
        console.log('error catched at get profile details api    ====   ', err)
        errorHandler(req, res, 500, 'Internal server error .', err)
    }
}