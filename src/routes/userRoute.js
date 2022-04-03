const express = require('express')
const { registerUser, loginUser, getUserProfileDetails, editUserProfile } = require('../controllers/userController')
const verifyToken = require('../helpers/verifyToken')
const router = express.Router()



router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/getUserProfileDetials').get(verifyToken, getUserProfileDetails)
router.route('/editUserProfile').get(verifyToken, editUserProfile)



module.exports = router;