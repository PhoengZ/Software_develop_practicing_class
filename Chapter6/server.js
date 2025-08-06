const express = require('express')
const dotenv = require('dotenv')

dotenv.config({path: './config/config.env'})

const app = express()

app.get('/', (req,res)=>{
    res.status(200).json({
        message: "Hello from the server"
    })
})

const port = process.env.PORT || 5000
app.listen(port, ()=>{
    console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${port}`)
})