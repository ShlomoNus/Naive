const router = require('express').Router();
const fleetController= require('./controller')
router.get('/:id',fleetController.getFleetVessels)
router.get( '/', fleetController.getGeneralData) 

module.exports=router;

