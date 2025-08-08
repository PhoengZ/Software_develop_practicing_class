const express = require('express')
const {getAppointments, getAppointment, addAppointment} = require('../controllers/appointments')
const {protect} = require('../middleware/auth')

const router = express.Router({mergeParams:true})

router.route('/').get(protect, getAppointments).post(protect,addAppointment)
router.route('/:id').get(getAppointment) // professor go public first
module.exports = router