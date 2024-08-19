const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const thresholdSchema = new mongoose.Schema({
  orderValue: Number,
  cost: Number,
});

const postalCodesSchema = new mongoose.Schema({
  type: { type: String, required: true },
  ranges: [{ start: String, end: String }],
  list: [String],
  single: String,
});

const suburbSchema = new mongoose.Schema({
  suburbName: { type: String, required: true },
  state: String,
  postalCodes: postalCodesSchema,
  delivery_costs: {
    thresholds: [thresholdSchema],
    above_threshold: Number,
  },
  pickup_options: {
    thresholds: [thresholdSchema],
    above_threshold: Number,
  },
});

const citySchema = new mongoose.Schema({
  cityName: { type: String, required: true },
  suburbs: [suburbSchema],
});

const stateSchema = new mongoose.Schema({
  stateName: { type: String, required: true },
  cities: [citySchema],
});

stateSchema.plugin(mongoosePaginate);

const State = mongoose.model('State', stateSchema);

module.exports = State;
