const router = require('express').Router();
const fleetController= require('./controller')
router.get('/filter/:id',fleetController.getVesselByProperties)
router.get('/:id',fleetController.getFleetVessels)
router.get( '/', fleetController.getFleets) 

module.exports=router;

