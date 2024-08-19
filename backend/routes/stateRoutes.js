const express = require('express');
const router = express.Router();
const stateController = require('../controller/stateController');

// Route to create a new state
router.post('/states', stateController.createState);

// Route to get state entries with pagination
router.get('/states', stateController.retrieveStates);

// Route to get all delivery costs
router.get('/delivery-costs', stateController.retrieveAllDeliveryCosts);



module.exports = router;
