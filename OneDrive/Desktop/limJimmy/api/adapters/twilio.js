const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const from = process.env.TWILIO_FROM;
const client = require('twilio')(accountSid, authToken);

module.exports = async function sendTwilio(input) {
  try {
    twilioStatus = await client.messages
      .create({
        body: input,
        from: from,
        // statusCallback: 'https://824e-2600-6c50-637f-d920-10a0-94f5-94c9-4927.ngrok.io/webhooks/twilio/sms',
        statusCallback: 'https://d517-2600-6c50-637f-d920-169-6556-9845-7c71.ngrok.io/webhooks/twilio/sms',
        to: '+16267823475'
        //change "newMessage" sid from empty string to message.sid
      })
    return twilioStatus
  } catch (e) {
    console.error('twilio message did not send (module)', e)
  }
}
