const State = require("../model/stateModel");

const addState = async (data) => {
  try {
    const state = new State(data);
    await state.save();
    return state;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getStates = async (query) => {
  const { page = 1, limit = 10 } = query;
  try {
    const states = await State.paginate({}, { page, limit });
    return states;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAllDeliveryCosts = async () => {
  try {
    const deliveryCosts = await State.find().lean();
    return deliveryCosts;
  } catch (error) {
    throw new Error(error.message);
  }
};


module.exports = {
  addState,
  getStates,
  getAllDeliveryCosts
};
