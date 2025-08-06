const express = require('express')
const dotenv = require('dotenv')
const hospitals = require('./routes/hospital')


dotenv.config({path: './config/config.env'})

const app = express()

app.use(express.json())

app.use('/api/v1/hospitals',hospitals)

const port = process.env.PORT || 5000
app.listen(port, ()=>{
    console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${port}`)
})