const express = require('express')
const dotenv = require('dotenv').config()
const app = express()
const userRoutes = require('./routes/userRoutes')
const categoryRoutes = require('./routes/categoryRoutes')
const errorHandler = require('./middleware/errorHandler')

const connectDb = require('./config/dbConnection')

connectDb()
app.use(express.json())


app.use('/api/user/', userRoutes)
app.use('/api/caterory/', categoryRoutes)

app.get('/api/product', (req, res, next) => {
    // Simulate an error
    next(new Error("This is a simulated error."));
});

app.use(errorHandler)

const PORT = process.env.PORT ? process.env.PORT : '5000'

app.listen(PORT, () => {
    console.log(`Express server is running on PORT: ${PORT}...`)
})