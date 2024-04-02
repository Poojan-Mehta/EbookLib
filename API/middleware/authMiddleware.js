const jwt = require("jsonwebtoken")

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
        next()
    } catch (error) {
        return res.status(401).json({ error: "Access token has expired" });
    }
}

module.exports = checkAuthentication