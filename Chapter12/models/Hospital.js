const mongoose = require('mongoose')

const HospitalSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'Please add a hospital name'],
        unique:true,
        trim:true,
        maxlength:[50, "Hospital name can't be more than 50 characters"]
    },
    address:{
        type:String,
        required:[true, 'Please add a hospital address']
    },
    district:{
        type:String,
        required:[true, 'Please add a district name']
    },
    province:{
        type:String,
        required:[true, 'Please add a province name']
    },
    postalcode:{
        type:String,
        required:[true, 'Please add a postal code'],
        maxlength:[5, "Postal code can't be more than 5 digits"]
    },
    tel:{
        type:String,
    },
    region:{
        type:String,
        required:[true, 'Please add a region']
    }
},{
   toJSON:{virtuals:true}, // said mongo when parse document to json or object let mongo make virtual data following property that defined
   toObject:{virtuals:true}
})

HospitalSchema.virtual('appointments',{
    ref:'Appointment', // ref: model's name
    localField:'_id',
    foreignField:'hospital',
    justOne:false //get all
})

module.exports = mongoose.model('Hospital', HospitalSchema)