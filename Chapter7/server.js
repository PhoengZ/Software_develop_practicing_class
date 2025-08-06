const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')

const hospitalRoutes = require('./routes/hospitals')

dotenv.config({path: './config/config.env'})

connectDB()

const app = express()

app.use(express.json())

app.use('/api/v1/hospitals', hospitalRoutes)

const port = process.env.PORT || 5000

const server = app.listen(port, ()=>{
    console.log(`Server is running in ${process.env.NODE_ENV} mode on port: ${port}`)
})

process.on('unhandleRejection', (err, promise)=>{
    console.log(`Error: ${err.message}`);
    server.close(()=>{
        process.exit(1)
    })
})