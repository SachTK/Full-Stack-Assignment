const State = require('../model/model');

// Create a new state entry
exports.createState = async (req, res) => {
  try {
    const state = new State(req.body);
    await state.save();
    res.status(201).json(state);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get state entries with pagination
exports.getStates = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    const states = await State.paginate({}, { page, limit });
    res.json(states);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Edit a state entry
exports.updateState = async (req, res) => {
  try {
    const state = await State.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!state) return res.status(404).json({ error: 'State not found' });
    res.json(state);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a state entry
exports.deleteState = async (req, res) => {
  try {
    const state = await State.findByIdAndDelete(req.params.id);
    if (!state) return res.status(404).json({ error: 'State not found' });
    res.json({ message: 'State deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
