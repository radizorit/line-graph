const express = require('express');
const router = express.Router();

const {
    createUser,
    loginUser
    // getAllSubscription
} = require('../controllers/user')

router.route('/communications/user') //need to fix this route
    .post(createUser)

module.exports = router
