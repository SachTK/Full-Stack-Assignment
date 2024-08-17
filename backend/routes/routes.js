const express = require('express');
const router = express.Router();
const stateController = require('../controller/controller');

// Route to create a new state
router.post('/states', stateController.createState);

// Route to get state entries with pagination
router.get('/states', stateController.getStates);

// Route to edit a state entry
router.put('/states/:id', stateController.updateState);

// Route to delete a state entry
router.delete('/states/:id', stateController.deleteState);

module.exports = router;
