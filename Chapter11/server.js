const express = require('express')
const dotenv = require('dotenv')
const albumRoutes = require('./routes/albums')

dotenv.config({path:'./config/config.env'})

const app = express()

app.use(express.json())

app.use('/albums',albumRoutes)

const port = process.env.PORT || 5001

const server = app.listen(port, ()=>{
    console.log(`Server is running in ${process.env.NODE_ENV} mode on port: ${port}`);
})

process.on('unhandledRejection',(err, promise)=>{
    console.log(`Error: ${err.message}`);
    server.close(()=>{
        process.exit(1)
    })
})
