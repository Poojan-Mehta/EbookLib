const express = require('express')
const dotenv = require('dotenv').config()
const app = express()
const userRoutes = require('./routes/userRoutes')
const categoryRoutes = require('./routes/categoryRoutes')
const productRoutes = require('./routes/productRoutes')
const errorHandler = require('./middleware/errorHandler')

const connectDb = require('./config/dbConnection')

connectDb()
app.use(express.json())

app.use('/api/user/', userRoutes)
app.use('/api/caterory/', categoryRoutes)

app.use('/api/product/', productRoutes);

app.use(errorHandler)

const PORT = process.env.PORT ? process.env.PORT : '5000'

app.listen(PORT, () => {
    console.log(`Express server is running on PORT: ${PORT}...`)
})