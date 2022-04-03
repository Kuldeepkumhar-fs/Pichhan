const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: [true, 'Please enter your name .'],
        maxlength: [30, 'Name can not exceed 30 characters .'],
        minlength: [3, 'Name must be atleast of 3 characters .']
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        validate: [validator.isEmail, 'Please enter a valid email .']
    },
    password: {
        type: String,
        unique: true,
        required: [true, 'Please enter password .'],
        minlength: [4, 'Password must be atleast 4 characters .'],
        // select: false
    },
    role: {
        type: String,
        default: 'user'
    },

    // profilePhoto: {
    //     public_id: {
    //         type: String,
    //         required: true
    //     },
    //     url: {
    //         type: String,
    //         required: true
    //     }
    // },
    // resetPasswordToken:String,
    // resetPasswordExpire:Date
},
    { timestamps: true }
)


module.exports = mongoose.model('User', userSchema)