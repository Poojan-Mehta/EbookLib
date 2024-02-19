const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is mandatory."]
    },
    email: {
        type: String,
        required: [true, "Email is mandatory."]
    },
    contact: {
        type: String,
        required: [true, "Contact is mandatory."]
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("users", userSchema)