const User = require('../models/user');

module.exports.loginUser = async (req, res) => {
    try {
        let user = req.body
        let testingLogin = new User()
        let authenticationResult = await testingLogin.loginUser({
            login: user.login,
            password: user.password
        })
        if (authenticationResult[0] === undefined) {
            res.send(false)
        } else {
            res.send(authenticationResult[1])
        }
    } catch (e) {
        console.error(e, 'controllers unable to login')
    }
}