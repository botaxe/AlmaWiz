const mongoose = require('mongoose')
const validator = require('validator');
const formSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    PhoneNumber: {
        type: Number,
        required: true
    },
    Email: {
        type: String,
        required: true,
        validate : {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email',
            isAsync: false
        }
    },
    Description: {
        type: String,
        required: true

    }
})

module.exports = mongoose.model('Form', formSchema)