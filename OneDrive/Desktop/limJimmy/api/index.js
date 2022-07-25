const dotenv = require('dotenv')
const express = require('express');
const app = express();

// const MessagingResponse = require('twilio').twiml.MessagingResponse;
const cors = require('cors')

dotenv.config()

const mongo = require('./adapters/mongoConnection')

const https = require('https')
// const http = require('http')//connect before starting server
const MessageRoute = require('./routes/message')
const UserRoute = require('./routes/user')
const AuthRoute = require('./routes/auth')
const WebhookRoute = require('./routes/webhooks')

const bodyParser = require('body-parser');

app.use(express.json());
app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', MessageRoute)
app.use('/', UserRoute)
app.use('/', WebhookRoute)
app.use('/', AuthRoute)

//jlimanalysis@gmail.com 

let port = 5000

mongo.connect()
  .then(() => {
    console.log('DB Connection Successful')
  })
  .then(() => {
    //Server
    app.listen(port, () => {
      console.log(`SERVER RUNS ON ${port}`)
    })
  })
  .catch((e) => {
    console.error(e)
  })

app.get('/express_backend', (req, res) => {
  res.send({ express: 'UPDATED' });
});

app.get('/market', async (req, res) => {
  res.send('market')
})

// app.all('/sms', (req, res) => {
//   const twiml = new MessagingResponse();
//   twiml.message('This is a proper response');
//   res.writeHead(200, { 'Content-Type': 'text/xml' });
//   res.end(twiml.toString());
// })


