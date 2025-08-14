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
const swaggerJsDocs = require('swagger-jsdoc')
const swaagerUI = require('swagger-ui-express')


dotenv.config({path: './config/config.env'})

connectDB()

const app = express()
const limiter = rateLimit({
    windowMs: 10*60*1000, // 10 min
    max: 1000000 // can send request not more than 100
})
const swaggerOptions = {
    swaggerDefinition:{
        openapi: '3.0.0',
        info:{
            title:'Library API',
            version: '1.0.0',
            description: 'A simple express for VacQ API'
        },
        servers:[
            {
                url: 'http://localhost:5000/api/v1',
                description: 'Local development server'
            }
        ],
    },
    apis:['./routes/*.js'],
}
const swaggerDocs = swaggerJsDocs(swaggerOptions)
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
app.use('/api-docs',swaagerUI.serve, swaagerUI.setup(swaggerDocs))


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
