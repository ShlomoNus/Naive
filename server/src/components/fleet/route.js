const router = require('express').Router();
const fleetController= require('./controller')
router.get('/filter-vessels',fleetController.getVesselByProperties)
router.get('/:id',fleetController.getFleetVessels)
router.get( '/', fleetController.getGeneralData) 

module.exports=router;

