const mongoose = require('mongoose')

exports.connectDB = async ()=>{
    mongoose.set('strictQuery', true)
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log('Database connected:' + conn.connection.host);
    }catch(e){
        console.error('Database connection failed:', e.message)
    }
}

