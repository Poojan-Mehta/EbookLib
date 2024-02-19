const mongoose = require('mongoose')

const connectDb = async () => {
    try{
        const connect = await mongoose.connect(process.env.DB_CONNECTION_STRING)
        console.log(`DB connected successfully`)
    }catch(err){
        console.log(err)
        process.exit(1)
    }
}

module.exports = connectDb
