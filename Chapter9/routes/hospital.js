const express = require('express')
const {getHospitals, getHospitalsById, createHospital, updateHospital, deleteHospital} = require('../controllers/hospitals')
const {authorize} = require('../controllers/auth')
const {protect} = require('../middleware/auth')
const apptRoute = require('./appointments')
const router = express.Router()


router.use('/:hospitalID/appointments/',apptRoute)
//..rolese know with itself that its paramter have to change to array not parse array into the function
router.route('/').get(getHospitals).post(protect,authorize('admin'),createHospital)
router.route('/:id').get(getHospitalsById).put(protect,authorize('admin'),updateHospital).delete(protect,authorize('admin'),deleteHospital)

module.exports = router
