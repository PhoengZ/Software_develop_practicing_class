const Appointment = require("../models/Appointment")
const Hospital = require("../models/Hospital")

exports.getAppointments = async(req,res,next)=>{
    try{
        let query
        const filter = {}
        if (req.params.hospitalID){
            filter.hospital = req.params.hospitalID
        }
        if (req.user.role !== 'admin'){
            filter.user = req.user.id
        }
        query = Appointment.find(filter).populate({
            path:'hospital',//path: fields' name
            select:'name province tel'
        })
        const appt = await query
        res.status(200).json({
            success: true,
            count: appt.length,
            data: appt
        })
    }catch(e){
        console.error()
        res.status(500).json({
            success:false,
            msg: "Cannot find Appointments"
        })
    }
}

exports.getAppointment = async(req,res,next)=>{
    try{
        const id = req.params.id
        const appointment = await Appointment.findById(id).populate({
            path:'hospital',
            select: 'name description tel'
        })
        if (!appointment){
            return res.status(404).json({
                success:false,
                message:`No appointments with the id of ${id}`
            })
        }
        res.status(200).json({
            success:true,
            data:appointment
        })
    }catch(e){
        console.error(e.stack);
        res.status(500).json({
            success:false,
            message:"Cannot find appointment"
        })
    }
}

exports.addAppointment = async(req,res,next)=>{
    try{
        const uID = req.user.id
        const existedAppointment = await Appointment.find({user:uID}) // uID is string but can use uID to be 
        // value of field that have to use objectID because models define be object id that refer to UserSchema
        // so  mongoose try to convert string to objectID with itself
        if (existedAppointment.length >= 3 && req.user.role !== 'admin'){
            return res.status(400).json({
                success: false,
                message: `The user with id ${uID} has already made 3 appointments`
            })
        }
        const hID = req.params.hospitalID
        req.body.hospital = hID
        const hospital = await Hospital.findById(hID)
        if (!hospital){
            return res.status(404).json({
                success:false,
                message:`No hospital with the id of : ${hID}`
            })
        }
        const appt = await (await Appointment.create(req.body)).populate({
            path:'hospital',
            select:'name province tel'
        })
        res.status(200).json({
            success:true,
            data:appt
        })
    }catch(e){
        console.error(e.stack);
        res.status(500).json({
            success:false,
            message:'Cannot create appointment'
        })
    }
}

exports.editAppointment = async(req,res,next)=>{
    try{
        const id = req.params.id
        let appointment = await Appointment.findById(id)
        if (!appointment){
            return res.status(404).json({
                success: false,
                message: `No Appointment with the id of: ${id}`
            })
        }
        if (appointment.user.toString() !== req.user.id && req.user.role !== 'admin'){
            return res.status(401).json({
                success: false,
                message: `User ${id} isn't authorized to update this appointment`
            })
        }
        appointment = await Appointment.findByIdAndUpdate(id, req.body, {
            new:true,
            runValidators: true
        }).populate({
            path:'hospital',
            select:'name province tel'
        })
        res.status(200).json({
            success: true,
            data: appointment
        })
    }catch(e){
        console.error(e.stack);
        res.status(500).json({
            success: false,
            message: 'Cannot update Appointment'
        })
    }
}

exports.deleteAppointment = async(req,res,next) => {
    try{
        const id = req.params.id
        let appointment = await Appointment.findById(id)
        if (!appointment){
            return res.status(404).json({
                success: false,
                message: `No Appointment with the id of: ${id}`
            })
        }
        if (appointment.user.toString() !== req.user.id && req.user.role !== 'admin'){
            return res.status(401).json({
                success: false,
                message: `User ${id} isn't authorized to delete this appointment`
            })
        }
        await appointment.deleteOne()
        res.status(200).json({
            success: true,
            data: {}
        })
    }catch(e){
        console.error(e.stack);
        res.status(500).json({
            success: false,
            message: 'Cannot delete Appointment'
        })
    }
}

