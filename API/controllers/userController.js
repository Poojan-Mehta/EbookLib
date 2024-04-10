const User = require('../models/userModel')
const expressHandler = require('express-async-handler')
const jwt = require("jsonwebtoken")

const getAllUsers = async (req, res) => {

    const users = await User.find();
    res.status(200).json({message: "Get all users", data: users}) 
}

const getUserInfo = async(req, res) => {
    const user = await User.findById(req.params.id)

    res.status(200).json({message: "User information", data: user})
}

const createNewUser = expressHandler(async (req, res) => {
    
    const { name, email, contact, password } = req.body    

    const user = await User.create({
        name, email, contact, password
    })
    res.status(200).json({message: "User added succssfully", data: user})
    
})

const updateUserInfo = async(req, res) => {
    let userId = req.params.id
    const findUser = await User.findById(userId)
    if(!findUser){
        res.status(404)
        throw new Error("User not found")
    }

    const updatedUser = await User.findByIdAndUpdate(userId, req.body, {new: true})
    
    res.status(200).json({message: "User infomation", data: updatedUser})
}

const deleteUser = async(req, res) => {
    const userId = req.params.id

    const findUser = await User.findById(userId)
    if(!findUser){
        res.status(404)
        throw new Error("User not found")    
    }

    const deleteUser = await User.findByIdAndDelete(userId)
    res.status(200).json({message: "User deleted successfully...", data: deleteUser})
}

const generateAccessAndRefereshTokens = async(userId) =>{
    try{
        const user = await User.findById(userId);
        const accessToken = await user.generateAccessToken()
        const refreshToken = await user.generateRefreshToken()

        //save token in db
        user.refreshToken = refreshToken
        await user.save();

        return { accessToken, refreshToken }
    }catch(err){
        throw new Error(err)
    }
}

const generateAccessAndRefereshTokensWhenExpire = async(req, res) =>{
    try{        
        const refreshTokenCurrent = req.body.refreshToken;
        //verify token
        const verifyToken = jwt.verify(refreshTokenCurrent, process.env.REFRESH_TOKEN)
        if(!verifyToken){
            throw new Error("AccessToken expired, please login again")
        }
        const userId = verifyToken._id;

        // Generate new access and refresh tokens
        const tokens = await generateAccessAndRefereshTokens(userId);
        res.status(200).json({message: "successfully generated access and refreshToken", data: tokens})
    }catch(err){
        throw new Error(err)
    }
}

const loginUser = async(req, res) => {
    //get email password
    const { email, password } = req.body

    // Find the user by email
    const user = await User.findOne({ email });

    //convert and check in jwt
    const isPasswordCorrect = await user.isPasswordCorrect(password)
    if(!isPasswordCorrect){
        res.status(404)
        throw new Error("Invalid email or password")
    }

    //generate accesstoken and also save in db
    const {accessToken, refreshToken} = await generateAccessAndRefereshTokens(user._id)
    
    //get the logged in user
    const loggedInUser = await User.findById(user._id).select('-password -refreshToken')    

    return res
    .status(200)
    .json({
        message: "User loggedin successfully",
        data: accessToken, refreshToken, loggedInUser
    })

}

module.exports = { getAllUsers, getUserInfo, createNewUser, updateUserInfo, deleteUser, loginUser, generateAccessAndRefereshTokensWhenExpire}