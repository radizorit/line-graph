const Message = require('../models/message');
const sendTwilio = require('../adapters/twilio')
const cloudVision = require('../adapters/cloudVision')

const { messageSchema } = require('../helpers/validationSchema');
const { ObjectId } = require('mongodb');

module.exports.updateMessage = async (req, res) => {
    try {
        let id = req.params.id
        let message = new Message()
        let connection = await message.updateMessage()
        await connection.updateOne({ _id: ObjectId(id) }, {
            $set: {
                name: req.body.name,
                message: req.body.message,
                communication: req.body.communication,
                timeStamp: req.body.timeStamp,
                sid: req.body.sid,
                status: req.body.status,
                author: req.body.author,
                image: req.body.image
            }
        });
        console.log('update completed from controllers')
    } catch (e) {
        console.error(e, 'controllers error updating')
    }
}

module.exports.deleteMessage = async (req, res) => {
    try {
        let id = req.params.id
        let message = new Message()
        let connection = await message.deleteMessage()
        await connection.deleteOne({ "_id": ObjectId(id) });
    } catch (e) {
        console.error(e, 'controllers error deleting')
    }
}


module.exports.createMessage = async (req, res) => {
    let message = req.body, twilioMsg, postMessage, cloudVisionResults, twilioMessageInput
    const { error } = messageSchema.validate(req.body);

    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new Error(msg, 400)
    }

    try {
        cloudVisionResults = await cloudVision(message.image)
        twilioMessageInput = message.message + ' cloudVisionResults ' + cloudVisionResults
    } catch (e) {
        console.log('problems with the cloud vision in controller', e)
    }

    try {
        twilioMsg = await sendTwilio(twilioMessageInput)
    } catch (e) {
        console.log('problems with the sending twilio in controller', e)
    }

    //Message should be a ADAPTER connection
    try {
        postMessage = new Message()
        await postMessage.createMessage({
            id: message._id,
            name: message.name,
            message: twilioMessageInput,
            communication: message.communication,
            timeStamp: message.timeStamp,
            sid: twilioMsg['sid'],
            status: message.status,
            author: message.author,
            image: message.image
        })
    } catch (e) {
        console.error('error for creating message', e)
    }
}

module.exports.getAllMessages = async (req, res) => {

    let receivedMessages = new Message()
    let allMessages = await receivedMessages.getAllMessages()
    // let db = allMessages.db('communications')
    // let collection = db.collection('messages')
    allMessages
        .find({})
        .toArray((err, docs) => {
            if (err) {
                console.error('error from controllers', err)
            } else {
                res.json(docs)
            }
        })
}


/*
to upload to git
//edit code here in window editor
//update to github
//ec2 download from github
//upload you gotta be in the correct directory in terminal
    //limjimmy (locally and ec2)
        
        HOW TO ADD VERY IMPORTANT    
            //git add .
            //git commit -m "whatever message in quotes"
            //git push -u origin dev
        EC2 PULL
        //git checkout . what this do?
            //git pull
            

*/