const mongoose = require('mongoose')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const dotenv = require('dotenv').config()

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required."],
        index: true
    },
    email: {
        type: String,
        required: [true, "Email is required."]
    },
    contact: {
        type: String,
        required: [true, "Contact is required."]
    },
    image:{
        type: String
    },
    password:{
        type: String,
        required: [true, "Password is required."]
    },
    refreshToken:{
        type: String
    }
}, {
    timestamps: true
})

//is password modified then do bcrypt just before save
userSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password,10) //await is must
    next()
});

//compare password
userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
};

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            name:this.name,
            email:this.email            
        },
        process.env.ACCESS_TOKEN,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    )
};

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            name:this.name,
            email:this.email            
        },
        process.env.REFRESH_TOKEN,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
    )
};

module.exports = mongoose.model("users", userSchema)