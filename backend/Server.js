const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()
const cookieParser = require('cookie-parser')
const userRouter = require('./routes/UserRouter')


const PORT = process.env.PORT || 5000
const app = express()

// local middleware
app.use(cors({credentials:true, origin:'http://localhost:5173'}))
app.use(cookieParser())
app.use(express.json())

//connect to mongodb database
mongoose.connect(process.env.MONGO_URL)
.then(() => {
    console.log('mongodb connected succesfully')
})
.catch(err => {
    console.log(err)
})



// CONNECT TO SERVER
// app.get('/', (req, res, next) => {
//     res.send('hello there')
// })

// routes here
app.use('/api', userRouter)

// listen for server
app.listen(PORT , () => {
    console.log(`server is running on Port ${PORT}`)
})