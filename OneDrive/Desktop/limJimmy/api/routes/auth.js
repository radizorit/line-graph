const express = require('express');
const router = express.Router();

const {
    loginUser
} = require('../controllers/auth')

router.route('/api/1/communications/login')
    .post(loginUser)

module.exports = router