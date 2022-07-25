const { get } = require('../adapters/mongoConnection')
module.exports.updateTwilioSms = async (req, res) => {
    // console.log(req.body, 'twilioWebhook')
    if (req.body['MessageStatus'] === 'delivered') {
        try {
            let client = await get();
            let db = client.db('communications')
            let collection = db.collection('messages')
            deliveredMessage = await collection.findOneAndUpdate({ 'sid': req.body['SmsSid'] }, { $set: { 'status': 'delivered' } })
        } catch (e) {
            console.error('ONE failed to update db')
        }
    }
}