const express = require('express')
const dotenv = require('dotenv')
const hospitalRoutes = require('./routes/hospital')
const authRoutes = require('./routes/auth')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const {connectDB} = require('./config/db')

dotenv.config({path: './config/config.env'})

connectDB()

const app = express()
app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use('/api/v1/hospitals', hospitalRoutes)
app.use('/api/v1/auth', authRoutes)
const port = process.env.PORT || 5000

const server = app.listen(port, ()=>{
    console.log(`Server is running in ${process.env.NODE_ENV} mode on port: ${port}`)
})

process.on('unhandledRejection', (err, promise)=>{
    console.log(`Error: ${err.message}`)
    server.close(()=>{
        process.exit(1)
    })
})
