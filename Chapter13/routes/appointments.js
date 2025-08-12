const express = require('express')
const {getAppointments, getAppointment, addAppointment, editAppointment, deleteAppointment} = require('../controllers/appointments')
const {protect,authorize} = require('../middleware/auth')
const router = express.Router({mergeParams:true})

router.route('/').get(protect, getAppointments).post(protect,authorize('admin','user'),addAppointment)
router.route('/:id').get(protect,getAppointment).put(protect,authorize('admin','user'),editAppointment).delete(protect,authorize('admin','user'),deleteAppointment) // professor go public first
module.exports = router