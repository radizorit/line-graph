const { get } = require('../adapters/mongoConnection')
let ObjectId = require('mongodb').ObjectId;
const bcrypt = require('bcrypt')

module.exports = class User {
    constructor() {
        this.data = {
            _id: String,
            name: String,
            login: String,
            phone: Number,
            email: String,
            password: String,
            signUpDate: String,
            referral: String,
        }
        this.connection = get().db('communications').collection('users');
    }

    async userCreateValidation(login) {
        let userResult = await this.connection.find({ login: login }).toArray()
        if (userResult.length > 0) return false
        return true
    }

    async loginUser({ login, password }) {
        //set up data
        try {
            //given login, find the user and set it to "userInfo"
            let userResult = await this.connection.find({ login: login }).toArray()
            if (userResult[0] === undefined) return false

            let uniqueId = userResult[0]['_id'].toHexString()

            let bcryptResult = await bcrypt.compare(password, userResult[0]['password'])
            return [bcryptResult, uniqueId]
        } catch (e) {
            console.log('password is not a match')
        }
    }

    async createUser({ _id, name, login, phone, email, password,
        signUpDate, referral }) {
        try {
            this.data = {
                id: _id,
                name: name,
                login: login,
                phone: phone,
                email: email,
                password: password,
                signUpDate: signUpDate,
                referral: referral
            }
            this.connection.insertOne(this.data)
            return this.data
        } catch (e) {
            console.error(e, 'models error for users')
        }
    }
}



//define the name of the schema
//what is going into the schema
//what are the use cases of post, get, delete, patch

//add save function
//define model
//

//2 models: notification and users

//notification model:
    //add array of user id for receipients
    //name
    //time sent
    //status
    //