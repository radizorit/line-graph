const Joi = require('@hapi/joi')


module.exports.messageSchema = Joi.object({
    name: Joi.string().min(1).required(),
    message: Joi.string().min(1).required(),
    communication: Joi.string().min(1).required(),
    timeStamp: Joi.date(),
    sid: Joi.string(),
    status: Joi.string(),
    image: Joi.string()
})
