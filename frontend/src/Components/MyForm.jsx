"use client";

import React, { useState } from "react";

const MyForm2 = () => {
  const [cities, setCities] = useState([{ id: 0, thresholds: [{}], pickupThresholds: [{}] }]);

  const handleThresholdChange = (cityIndex, thresholdIndex, type, value) => {
    const updatedCities = [...cities];
    updatedCities[cityIndex].thresholds[thresholdIndex][type] = value;
    setCities(updatedCities);
  };

  const handlePickupThresholdChange = (cityIndex, thresholdIndex, type, value) => {
    const updatedCities = [...cities];
    updatedCities[cityIndex].pickupThresholds[thresholdIndex][type] = value;
    setCities(updatedCities);
  };

  const addThreshold = (cityIndex, event) => {
    event.preventDefault();
    const updatedCities = [...cities];
    updatedCities[cityIndex].thresholds.push({});
    setCities(updatedCities);
  };

  const removeThreshold = (cityIndex, thresholdIndex, event) => {
    event.preventDefault();
    const updatedCities = [...cities];
    updatedCities[cityIndex].thresholds.splice(thresholdIndex, 1);
    setCities(updatedCities);
  };

  const addPickupThreshold = (cityIndex, event) => {
    event.preventDefault();
    const updatedCities = [...cities];
    updatedCities[cityIndex].pickupThresholds.push({});
    setCities(updatedCities);
  };

  const removePickupThreshold = (cityIndex, thresholdIndex, event) => {
    event.preventDefault();
    const updatedCities = [...cities];
    updatedCities[cityIndex].pickupThresholds.splice(thresholdIndex, 1);
    setCities(updatedCities);
  };

  const addCity = (event) => {
    event.preventDefault();
    setCities([...cities, { id: cities.length, thresholds: [{}], pickupThresholds: [{}] }]);
  };

  return (
    <div className="bg-gray-100 p-10">
      <form
        action="/submit-data"
        method="POST"
        className="bg-white p-6 rounded shadow-md"
      >
        <h2 className="text-xl font-bold mb-4">State Information</h2>
        <label htmlFor="stateName" className="block mb-2 font-semibold">
          State Name:
        </label>
        <select
          id="stateName"
          name="stateName"
          required
          className="border border-gray-300 p-2 w-full mb-4 rounded"
        >
          <option value="">Select a State</option>
          <option value="QLD">Queensland</option>
          <option value="NSW">New South Wales</option>
          <option value="VIC">Victoria</option>
        </select>
        <h2 className="text-xl font-bold mb-4">City Information</h2>
        <div id="cityContainer">
          {cities.map((city, cityIndex) => (
            <div
              key={city.id}
              className="city border p-4 mb-4 rounded random-bg"
            >
              <label
                htmlFor={`cityName-${cityIndex}`}
                className="block mb-2 font-semibold"
              >
                City Name:
              </label>
              <select
                id={`cityName-${cityIndex}`}
                name={`cities[${cityIndex}][name]`}
                required
                className="border border-gray-300 p-2 w-full mb-4 rounded"
              >
                <option value="">Select a City</option>
                <option value="Brisbane">Brisbane</option>
                <option value="Sydney">Sydney</option>
                <option value="Melbourne">Melbourne</option>
              </select>
              <h3 className="text-lg font-semibold mb-2">Suburb Information</h3>
              <div className="suburb border p-4 mb-4 rounded random-bg">
                <label
                  htmlFor={`suburbName-${cityIndex}`}
                  className="block mb-2 font-semibold"
                >
                  Suburb Name:
                </label>
                <input
                  type="text"
                  id={`suburbName-${cityIndex}`}
                  name={`cities[${cityIndex}][suburbs][0][name]`}
                  required
                  className="border border-gray-300 p-2 w-full mb-4 rounded"
                />
                <label
                  htmlFor={`state-${cityIndex}`}
                  className="block mb-2 font-semibold"
                >
                  State:
                </label>
                <input
                  type="text"
                  id={`state-${cityIndex}`}
                  name={`cities[${cityIndex}][suburbs][0][state]`}
                  value="QLD"
                  required
                  className="border border-gray-300 p-2 w-full mb-4 rounded"
                />
                <label
                  htmlFor={`postalCodeType-${cityIndex}`}
                  className="block mb-2 font-semibold"
                >
                  Postal Code Type:
                </label>
                <select
                  id={`postalCodeType-${cityIndex}`}
                  name={`cities[${cityIndex}][suburbs][0][postalCodeType]`}
                  required
                  className="border border-gray-300 p-2 w-full mb-4 rounded"
                >
                  <option value="single">Single</option>
                  <option value="range">Range</option>
                  <option value="list">List</option>
                </select>
                <div id="postalCodeInput" className="mb-4">
                  <label
                    htmlFor={`postalCode-${cityIndex}`}
                    className="block mb-2 font-semibold"
                  >
                    Postal Code:
                  </label>
                  <input
                    type="text"
                    id={`postalCode-${cityIndex}`}
                    name={`cities[${cityIndex}][suburbs][0][postalCodes]`}
                    required
                    className="border border-gray-300 p-2 w-full mb-4 rounded"
                  />
                </div>
                <h4 className="text-lg font-semibold mb-2 delivery-bg p-2 rounded">
                  Delivery Costs
                </h4>
                <div
                  id="deliveryCosts"
                  className="p-4 mb-4 delivery-bg rounded"
                >
                  {city.thresholds.map((threshold, thresholdIndex) => (
                    <div className="threshold mb-4" key={thresholdIndex}>
                      <label
                        htmlFor={`thresholdAmount-${cityIndex}-${thresholdIndex}`}
                        className="block mb-2 font-semibold"
                      >
                        Order Value Threshold:
                      </label>
                      <input
                        type="number"
                        id={`thresholdAmount-${cityIndex}-${thresholdIndex}`}
                        name={`cities[${cityIndex}][suburbs][0][delivery_costs][fixed][thresholds][${thresholdIndex}][amount]`}
                        value={threshold.amount || ''}
                        onChange={(e) =>
                          handleThresholdChange(
                            cityIndex,
                            thresholdIndex,
                            "amount",
                            e.target.value
                          )
                        }
                        required
                        className="border border-gray-300 p-2 w-full mb-2 rounded"
                      />
                      <label
                        htmlFor={`costBelowThreshold-${cityIndex}-${thresholdIndex}`}
                        className="block mb-2 font-semibold"
                      >
                        Cost Below Threshold:
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        id={`costBelowThreshold-${cityIndex}-${thresholdIndex}`}
                        name={`cities[${cityIndex}][suburbs][0][delivery_costs][fixed][thresholds][${thresholdIndex}][cost]`}
                        value={threshold.cost || ''}
                        onChange={(e) =>
                          handleThresholdChange(
                            cityIndex,
                            thresholdIndex,
                            "cost",
                            e.target.value
                          )
                        }
                        required
                        className="border border-gray-300 p-2 w-full mb-4 rounded"
                      />
                      <button
                        type="button"
                        onClick={(e) => removeThreshold(cityIndex, thresholdIndex, e)}
                        className="text-red-500"
                      >
                        Remove Threshold
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={(e) => addThreshold(cityIndex, e)}
                    className="text-blue-500"
                  >
                    Add Another Threshold
                  </button>
                  <label
                    htmlFor={`fixedAboveThreshold-${cityIndex}`}
                    className="block mb-2 font-semibold"
                  >
                    Fixed Cost (Above Threshold):
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    id={`fixedAboveThreshold-${cityIndex}`}
                    name={`cities[${cityIndex}][suburbs][0][delivery_costs][fixed][above_threshold]`}
                    required
                    className="border border-gray-300 p-2 w-full mb-4 rounded"
                  />
                </div>
                <h4 className="text-lg font-semibold mb-2 pickup-bg p-2 rounded">
                  Pickup Options
                </h4>
                <div id="pickupOptions" className="p-4 mb-4 pickup-bg rounded">
                  {city.pickupThresholds.map((threshold, thresholdIndex) => (
                    <div className="threshold mb-4" key={thresholdIndex}>
                      <label
                        htmlFor={`pickupThresholdAmount-${cityIndex}-${thresholdIndex}`}
                        className="block mb-2 font-semibold"
                      >
                        Order Value Threshold:
                      </label>
                      <input
                        type="number"
                        id={`pickupThresholdAmount-${cityIndex}-${thresholdIndex}`}
                        name={`cities[${cityIndex}][suburbs][0][pickup_options][thresholds][${thresholdIndex}][amount]`}
                        value={threshold.amount || ''}
                        onChange={(e) =>
                          handlePickupThresholdChange(
                            cityIndex,
                            thresholdIndex,
                            "amount",
                            e.target.value
                          )
                        }
                        required
                        className="border border-gray-300 p-2 w-full mb-2 rounded"
                      />
                      <label
                        htmlFor={`pickupCostBelowThreshold-${cityIndex}-${thresholdIndex}`}
                        className="block mb-2 font-semibold"
                      >
                        Pickup Cost Below Threshold:
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        id={`pickupCostBelowThreshold-${cityIndex}-${thresholdIndex}`}
                        name={`cities[${cityIndex}][suburbs][0][pickup_options][thresholds][${thresholdIndex}][cost]`}
                        value={threshold.cost || ''}
                        onChange={(e) =>
                          handlePickupThresholdChange(
                            cityIndex,
                            thresholdIndex,
                            "cost",
                            e.target.value
                          )
                        }
                        required
                        className="border border-gray-300 p-2 w-full mb-4 rounded"
                      />
                      <button
                        type="button"
                        onClick={(e) => removePickupThreshold(cityIndex, thresholdIndex, e)}
                        className="text-red-500"
                      >
                        Remove Threshold
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={(e) => addPickupThreshold(cityIndex, e)}
                    className="text-blue-500"
                  >
                    Add Another Threshold
                  </button>
                  <label
                    htmlFor={`pickupAboveThreshold-${cityIndex}`}
                    className="block mb-2 font-semibold"
                  >
                    Pickup Cost (Above Threshold):
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    id={`pickupAboveThreshold-${cityIndex}`}
                    name={`cities[${cityIndex}][suburbs][0][pickup_options][above_threshold]`}
                    required
                    className="border border-gray-300 p-2 w-full mb-4 rounded"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <button type="button" onClick={addCity} className="text-blue-500">
          Add Another City State
        </button>
        <br />
        <br />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded mt-4"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default MyForm2;
