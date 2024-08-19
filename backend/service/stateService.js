import Service from "../model/stateModel";

export const addState = async (data) => {
  try {
    const service = new Service(data);
    await service.save();
    return service;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getStates = async (query) => {
  const { page = 1, limit = 10 } = query;
  try {
    const states = await Service.paginate({}, { page, limit });
    return states;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getAllDeliveryCosts = async () => {
  try {
    const deliveryCosts = await Service.find().lean();
    return deliveryCosts;
  } catch (error) {
    throw new Error(error.message);
  }
};
