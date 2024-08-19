const {
  addState,
  getStates,
  getAllDeliveryCosts,
} = require("../service/stateService");

// Create a new state entry
exports.createState = async (req, res) => {
  try {
    const data = await addState(req.body);
    res.status(201).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get state entries with pagination
exports.retrieveStates = async (req, res) => {
  try {
    const data = await getStates(req.query);
    res.status(201).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all delivery costs
exports.retrieveAllDeliveryCosts = async (req, res) => {
  try {
    const data = await getAllDeliveryCosts();
    res.status(201).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
