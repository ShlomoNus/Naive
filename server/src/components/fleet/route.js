const router = require('express').Router();
const fleetController= require('./controller')
router.get('/vessels',fleetController.getVesselByProperties)
router.get('/:id',fleetController.getFleetVessels)
router.get( '/', fleetController.getFleets) 

module.exports=router;

