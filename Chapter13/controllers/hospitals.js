const Appointment = require("../models/Appointment");
const Hospital = require("../models/Hospital")
const qs = require('qs');

exports.getHospitals = async (req,res,next)=>{
    try{
        const reqQuery = {...req.query}
        const removeFields = ['select', 'sort', 'page', 'limit']
        removeFields.forEach(object=> delete reqQuery[object])
        let queryObj = qs.parse(reqQuery);
        queryObj = JSON.parse(
          JSON.stringify(queryObj).replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`)
        );
        hospitalsQuery = Hospital.find(queryObj).populate('appointments')
        if (req.query.select){
            const fields = req.query.select.split(',').join(' ')
            hospitalsQuery = hospitalsQuery.select(fields)
        }
        if (req.query.sort){
            const sortBy = req.query.sort.split(',').join(' ')
            hospitalsQuery = hospitalsQuery.sort(sortBy)
        }else{
            hospitalsQuery = hospitalsQuery.sort('-createdAt')
        }
        const page = parseInt(req.query.page, 10) || 1
        const limit = parseInt(req.query.limit, 10) || 25
        const startAt = (page-1)*limit
        const endAt = page*limit
        const total = await Hospital.countDocuments()
        // in my view i think total have to be total of record that following condition not total record isn't following condition
        // const total = await Hospital.countDocuments(queryObj)
        hospitalsQuery = hospitalsQuery.skip(startAt).limit(limit)
        const hospitals = await hospitalsQuery
        const pagination = {}
        if (endAt < total){
            pagination.next = {
                page:page+1,
                limit:limit
            }
        }
        if (startAt > 0){
            pagination.prev = {
                page:page-1,
                limit:limit
            }
        }
        res.status(200).json({
            success:true, 
            pagination,
            count: hospitals.length,
            data: hospitals})
    }catch(e){
        res.status(400).json({
            success: false,
            message: e.message || 'Unknown error occurred while fetching hospitals'
        })
    }
}

exports.getHospitalsById = async (req,res,next)=>{
    const id = req.params.id
    try{
        const hospital = await Hospital.findById(id).populate('appointments')
        if (!hospital){
            return res.status(404).json({
                success: false,
                message: `Hospital with id: ${id} not found`
            })
        }
        res.status(200).json({
            success: true,
            data: hospital
        })
    }catch(e){
        res.status(400).json({
            success:false,
            message: e.message || 'Unknown error occured while fecthing'
        })
    }
}

exports.createHospital = async(req,res,next)=>{
    try{
        const payload = new Hospital(req.body)
        const hospital = await Hospital.create(payload)
        res.status(201).json({
            success: true,
            data: hospital
        })
    }catch(e){
        res.status(400).json({
            success: false,
            message: e.message || 'Unknown error occurred while creating hospital'
        })
    }
}

exports.updateHospital = async(req,res,next)=>{
    const id = req.params.id
    try{
        const hospital = await Hospital.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        })
        if (!hospital){
            res.status(404).json({
                success: false,
                message: `Hospital with id: ${id} not found`
            })
        }
        res.status(200).json({
            success: true,
            data:hospital
        })
    }catch(e){
        res.status(400).json({
            success: false,
            message: e.message || 'Unknown error occurred while updating hospital'
        })
    }
    
}

exports.deleteHospital = async(req,res,next)=>{
    const id = req.params.id
    try{
        const hospital = await Hospital.findById(id)
        if (!hospital){
            res.status(404).json({
                success: false,
                message: `Hospital with id: ${id} not found`
            })
        }
        await Appointment.deleteMany({hospital: id})
        await Hospital.deleteOne({_id:id})
        res.status(200).json({
            success: true,
            data: {}
        })
    }catch(e){
        res.status(400).json({
            success: false,
            message: e.message || 'Unknown error occurred while deleting hospital'
        })
    }
}