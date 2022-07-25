const { get } = require('../adapters/mongoConnection')
module.exports = class Message {
    constructor() {
        this.data = {
            _id: String,
            name: String,
            message: String,
            communication: String,
            timeStamp: Date,
            sid: String,
            status: String,
            author: String,
            image: String
            // author: {
            //     type: Schema.Types.ObjectId,
            //     ref: 'Subscribe'
            // }
        }
        this.connection = get().db('communications').collection('messages');
    }

    async updateMessage() {
        try {
            // await this.connection.findByIdAndRemove(id).exec();
            return this.connection
        } catch (e) {
            console.error(e, 'deleting error in models')
        }
    };

    async deleteMessage() {
        try {
            // await this.connection.findByIdAndRemove(id).exec();
            return this.connection
        } catch (e) {
            console.error(e, 'deleting error in models')
        }
    };

    async createMessage({ _id, name, message, timeStamp, communication, sid, author, image }) {
        this.data = {
            _id: _id,
            name: name,
            message: message,
            communication: communication,
            timeStamp: timeStamp,
            sid: sid,
            status: 'queue',
            author: author,
            image: image
        }
        try {
            this.connection.insertOne(this.data)
            return this.data
        } catch (e) {
            console.error(e, 'models')
        }

    }

    async getAllMessages() {
        return this.connection
    }
}
        // //update sid and delivery status?
        // //create function

        // //get function

        // //delete function

        // //put function