const express = require('express')
const {getHospitals, getHospitalsById, createHospital, updateHospital, deleteHospital} = require('../controllers/hospitals')
const {protect,authorize} = require('../middleware/auth')
const apptRoute = require('./appointments')
const router = express.Router()


router.use('/:hospitalID/appointments/',apptRoute)
//..rolese know with itself that its paramter have to change to array not parse array into the function
router.route('/').get(getHospitals).post(protect,authorize('admin'),createHospital)
router.route('/:id').get(getHospitalsById).put(protect,authorize('admin'),updateHospital).delete(protect,authorize('admin'),deleteHospital)


module.exports = router


/** 
 * @swagger
 * components:
 *  schemas:
 *      Hospital:
 *          type: object
 *          required: 
 *          - name
 *          - address
 *          properties:
 *              id:
 *                  type: string
 *                  format: uuid
 *                  description: the auto-generated id of hospital
 *                  example: 6896a0aff8bc6738cf178a88
 *              name: 
 *                  type: string
 *                  description: Hospital's name
 *              address: 
 *                  type: string
 *                  description: House no. , Street, Road
 *              district: 
 *                  type: string
 *                  description: District
 *              province: 
 *                  type: string
 *                  description: Province
 *              postalcode: 
 *                  type: string
 *                  description: 5 digits postal code
 *              tel: 
 *                  type: string
 *                  description: Telephone number of Hospital
 *              region: 
 *                  type: string
 *                  description: Region
 *          example: 
 *              id: 6896a0aff8bc6738cf178a88
 *              name: สินแพทย์
 *              address: 9/99 ถ.รามอินทรา กม 8.5 แขวงคันนายาว
 *              district: คันนายาว
 *              province: กรุงเทพมหานคร
 *              postalcode: 10230
 *              tel: 02-9485380-90
 *              region: กรุงเทพมหานคร (Bangkok)
 * tags: 
 *  name: Hospitals
 *  description: The Hospital managing API
 * 
 * /hospitals: 
 *  get:
 *      summary: return list of all hospitals
 *      tags: [Hospitals]
 *      responses: 
 *          200: 
 *              description: the list of all hospitals
 *              content: 
 *                  application/json: 
 *                      schema: 
 *                          type: object
 *                          properties:
 *                              success: 
 *                                  type: boolean
 *                                  example: true
 *                              data: 
 *                                  type: array
 *                                  items: 
 *                                      $ref: '#/components/schemas/Hospital'
 *  post:
 *      summary: Create a new hospital
 *      tags: [Hospitals]
 *      requestBody: 
 *          required: true
 *          content: 
 *              application/json: 
 *                  schema: 
 *                      $ref: '#/components/schemas/Hospital'
 *      responses:
 *          201:
 *              description: The hospital was successfully created
 *              content: 
 *                  application/json:   
 *                      schema: 
 *                              type: object
 *                              properties:
 *                                  success: 
 *                                      type: boolean
 *                                      example: true
 *                                  data: 
 *                                      $ref: '#/components/schemas/Hospital'
 *          500:
 *              description: Some server error
 * 
 * /hospitals/{id}:
 *  get:
 *      summary: Get the hospital by id
 *      tags: [Hospitals]
 *      parameters: 
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: the hospital id
 *      responses: 
 *          200:
 *              description: The hospital description by id
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              success: 
 *                                  type: boolean
 *                                  example: true
 *                              data:
 *                                  $ref: '#/components/schemas/Hospital'
 *          404:
 *              description: the hospital id not found
 *  put:
 *      summary: Update the hospital by id
 *      tags: [Hospitals]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: the hospital id
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:   
 *                  schema:
 *                      $ref: '#/components/schemas/Hospital'
 *      responses: 
 *          200: 
 *              description: the hospital was updated
 *              content:
 *                  application/json:   
 *                      schema:
 *                          type: object
 *                          properties:
 *                              success: 
 *                                  type: boolean
 *                                  example: true
 *                              data:
 *                                  $ref: '#/components/schemas/Hospital'
 *          404: 
 *              description: the hospital with id not found
 *          500: 
 *              description: some error happened
 *              
 *  delete:
 *      summary: Remove the hospital by id
 *      tags: [Hospitals]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema: 
 *              type: string
 *            required: true
 *            description: the id of hospital
 *      responses:
 *          200:
 *              description: The hospital was deleted
 *          404: 
 *              description: the hospital with id was not found
*/      