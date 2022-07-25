const process = require('dotenv/config')


// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.TWILIO_ACCOUNT_SID;
const authToken = process.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

// module.exports.send = function send(response, version) {
//     if(version == 'phone') {
//         console.log(`${response.destination} is sent a message! The message 
//                     "${response.message}" through ${version}, thanks to the helpful guys at Twilio`)
//     } else if(version == 'email') {
//         console.log(`${response.destination} is sent a message! The message 
//                     "${response.message}" through ${version}, thanks to the helpful guys at SendGrid`)
//     }
// }

module.exports.sendTwilio = function sendTwilio(response) {
  client.messages
    .create({
      body: response.message,
      from: '+19794919652',
      to: '+1' + response.destination
    })
    .then(message => console.log(message.sid));
  //   console.log(response)
}
