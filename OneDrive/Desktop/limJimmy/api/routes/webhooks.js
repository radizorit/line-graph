const express = require('express');
const router = express.Router();

//specify all webhook routes
const {
    updateTwilioSms
} = require('../controllers/webhookTwilio')

router.route('/webhooks/twilio/sms')
    .post(updateTwilioSms)

//create another endpoint like limJimmy/webhooks/twilio -->
// THEN ADD THIS TWILIO

//build now is for twilio sms webhook

//future provide sendgrid webhook

module.exports = router



//account for inbound text messages
//status updates will also include SID, you should be able to query your databse to find the matching texts

//handle cases for when they message me back

//need another controller to handle the webhook, to update the current status