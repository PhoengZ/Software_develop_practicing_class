const express = require('express')
const dotenv = require('dotenv')
const hospitalRoutes = require('./routes/hospital')
const authRoutes = require('./routes/auth')
const apptRoutes = require('./routes/appointments')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const helmet = require('helmet')
const mongoSanitize = require('express-mongo-sanitize')
const {xss} = require('express-xss-sanitizer')
const {connectDB} = require('./config/db')
const rateLimit = require('express-rate-limit')
const hpp = require('hpp')

dotenv.config({path: './config/config.env'})

connectDB()

const app = express()
const limiter = rateLimit({
    windowMs: 10*60*1000, // 10 min
    max: 100 // can send request not more than 100
})


app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use((req, res, next) => {
  req.body = mongoSanitize.sanitize(req.body);
  req.params = mongoSanitize.sanitize(req.params);
  next();
});
app.use(helmet())
app.use(xss())
app.use(limiter)
app.use(hpp())

app.use('/api/v1/hospitals', hospitalRoutes)
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/appointments',apptRoutes)

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
