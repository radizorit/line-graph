const Subscribe = require('../models/subscribe');

module.exports.createSubscription = async (req, res) => {
    let newSubscribe = new Subscribe({
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        password: req.body.password,
        signUpDate: req.body.signUpDate,
        referral: req.body.referral
    })
    try {
        await newSubscribe.save()
        res.send(JSON)
    } catch (err) {
        console.log('controllers error', err)
    }

}

module.exports.getAllSubscription = async (req, res) => {
    Subscribe.find({})
        .then((data) => {
            // console.log('Data: ', data)
            res.json(data)
        })
        .catch((error) => {
            console.log('error:', error)
        })
}