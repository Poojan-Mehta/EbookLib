const jwt = require("jsonwebtoken")
const User = require("../models/userModel")

const checkAuthentication = async (req, res, next) => {
    try {
        //find token from header
        const token = req.headers["authorization"]?.replace("Bearer ","")
        if(token === undefined){
            //throw new Error("Invalid credentials")
            return res.status(401).json({ error: "Invalid credentials" });
        }
        //verify jwt token
        const verifyToken = await jwt.verify(token, process.env.ACCESS_TOKEN)  
        if(!verifyToken){
            //error
        }

        const user = await User.findById(verifyToken._id).select('-password -refreshToken')
        req.user = user
        //fetch user data and in req add user data
        next()
    } catch (error) {
        if (error.message === 'jwt expired') {
            return res.status(401).json({ error: "Access token has expired" });
        } else {
            console.log(error);
            return res.status(401).json({ error: "Token verification failed" });
        }
    }
}

module.exports = checkAuthentication