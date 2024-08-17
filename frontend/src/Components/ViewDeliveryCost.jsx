'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SearchDeliveryCost = () => {
  const [postalCode, setPostalCode] = useState('');
  const [deliveryCosts, setDeliveryCosts] = useState([]);
  const [filteredDeliveryCosts, setFilteredDeliveryCosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch all delivery costs initially
    const fetchDeliveryCosts = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/delivery-costs');
        setDeliveryCosts(response.data);
        setFilteredDeliveryCosts(response.data); // Initially show all delivery costs
      } catch (err) {
        setError('Could not retrieve delivery costs. Please try again.');
      }
    };

    fetchDeliveryCosts();
  }, []);

  const handleSearch = () => {
    setError(null);

    if (postalCode === '') {
      setFilteredDeliveryCosts(deliveryCosts); // Show all if search input is empty
    } else {
      const filtered = deliveryCosts.filter((state) =>
        state.cities.some((city) =>
          city.suburbs.some((suburb) =>
            suburb.postalCodes.single.includes(postalCode)
          )
        )
      );
      if (filtered.length === 0) {
        setError('No delivery cost found for the provided postal code.');
      } else {
        setFilteredDeliveryCosts(filtered);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Search Delivery Cost by Postal Code</h1>
      <div className="mb-4">
        <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">
          Enter Postal Code
        </label>
        <input
          type="text"
          id="postalCode"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white p-2 rounded-md"
      >
        Search
      </button>

      {error && <div className="text-red-500 mt-4">{error}</div>}

      <div className="mt-4">
        <h2 className="text-lg font-bold mb-2">Delivery Costs</h2>
        <table className="min-w-full bg-white border border-gray-300 mt-4">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">State Name</th>
              <th className="px-4 py-2 border-b">City Name</th>
              <th className="px-4 py-2 border-b">Suburb Name</th>
              <th className="px-4 py-2 border-b">Postal Code</th>
              <th className="px-4 py-2 border-b">Order Value</th>
              <th className="px-4 py-2 border-b">Delivery Cost</th>
            </tr>
          </thead>
          <tbody>
            {filteredDeliveryCosts.map((state, stateIndex) =>
              state.cities.map((city, cityIndex) =>
                city.suburbs.map((suburb, suburbIndex) => (
                  <tr key={`${stateIndex}-${cityIndex}-${suburbIndex}`}>
                    <td className="px-4 py-2 border-b">{state.stateName}</td>
                    <td className="px-4 py-2 border-b">{city.cityName}</td>
                    <td className="px-4 py-2 border-b">{suburb.suburbName}</td>
                    <td className="px-4 py-2 border-b">{suburb.postalCodes.single}</td>
                    <td className="px-4 py-2 border-b">{suburb.delivery_costs.thresholds[0]?.orderValue}</td>
                    <td className="px-4 py-2 border-b">{suburb.delivery_costs.thresholds[0]?.cost}</td>
                  </tr>
                ))
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SearchDeliveryCost;
