const User = require('../models/user');
const bcrypt = require('bcrypt')

module.exports.loginUser = async (req, res) => {

    //check user
    //see if it the login/password is a match
    //where do we use bcrypt or hash?
    try {
        let user = req.body
        let testingLogin = new User()
        let authenticationResult = await testingLogin.loginUser({
            login: user.login,
            password: user.password
        })
        if (authenticationResult) {
            // res.send()
            console.log('correct password send the response somewhere back')
            // res.redirect('/communications')
            res.send('good to go')
            //res.redirect to id
        } else {
            //res.redirect to homepage?
            console.log('wrong password')
        }

    } catch (e) {
        console.error(e, 'controllers unable to login')
    }
}

module.exports.createUser = async (req, res) => {
    let postUser = new User()
    if (await postUser.userCreateValidation(req.body.login)) {
        try {
            const user = req.body;
            const salt = await bcrypt.genSalt()
            const hashedPassword = await bcrypt.hash(user.password, salt)

            // let aboutToPost = new User()
            await postUser.createUser({
                id: user.id,
                name: user.name,
                login: user.login,
                phone: user.phone,
                email: user.email,
                password: hashedPassword,
                signUpDate: user.signUpDate,
                referral: user.referral
            })
        } catch (e) {
            console.error('error for creating message', e)
        }
    } else {
        //404 need to send this back to frontend
        console.log('404 error, login already taken')
    }
}

module.exports.getAllUser = async (req, res) => {
    let data = await User.find({})
    res.json(data)
}