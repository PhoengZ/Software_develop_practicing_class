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
        const hID = req.params.hospitalID
        req.body.hospital = hID
        const hospital = await Hospital.findById(hID)
        if (!hospital){
            return res.status(404).json({
                success:false,
                message:`No hospital with the id of : ${hID}`
            })
        }
        const appt = await Appointment.create(req.body)
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

