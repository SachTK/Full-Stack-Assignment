"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "./Button";
import { IoMdArrowRoundBack } from "react-icons/io";
import Link from "next/link";

const DeliveryCostTabel = () => {
  const [postalCode, setPostalCode] = useState("");
  const [deliveryCosts, setDeliveryCosts] = useState([]);
  const [filteredDeliveryCosts, setFilteredDeliveryCosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDeliveryCosts = async () => {
      try {
        const response = await axios.get("/api/delivery-costs");
        setDeliveryCosts(response.data);
        setFilteredDeliveryCosts(response.data);
      } catch (err) {
        setError("Could not retrieve delivery costs. Please try again.");
      }
    };

    fetchDeliveryCosts();
  }, []);

  const handleSearch = () => {
    setError(null);

    if (postalCode === "") {
      setFilteredDeliveryCosts(deliveryCosts);
    } else {
      const filtered = deliveryCosts.filter((state) =>
        state.cities.some((city) =>
          city.suburbs.some((suburb) => {
            const { type, single, ranges, list } = suburb.postalCodes;

            if (type === "single") {
              return single.includes(postalCode);
            } else if (type === "range") {
              return ranges.some(
                (range) =>
                  parseInt(postalCode) >= parseInt(range.start) &&
                  parseInt(postalCode) <= parseInt(range.end)
              );
            } else if (type === "list") {
              return list.includes(postalCode);
            }
            return false;
          })
        )
      );

      if (filtered.length === 0) {
        setError("No delivery cost found for the provided postal code.");
      } else {
        setFilteredDeliveryCosts(filtered);
      }
    }
  };

  const renderPostalCodes = (postalCodes) => {
    if (postalCodes.type === "single") {
      return postalCodes.single;
    } else if (postalCodes.type === "range") {
      return postalCodes.ranges.map((range, index) => (
        <span key={index}>
          {range.start} - {range.end}
          {index < postalCodes.ranges.length - 1 && ", "}
        </span>
      ));
    } else if (postalCodes.type === "list") {
      return postalCodes.list.join(", ");
    } else {
      return "N/A";
    }
  };

  return (
    <div className="container mx-auto p-4 px-[20px] lg:px-[60px]">
      <h1 className="text-2xl font-bold mb-4">
        Search Delivery Cost by Postal Code
      </h1>
      <div className="mb-4">
        <label
          htmlFor="postalCode"
          className="block text-sm font-medium text-gray-700"
        >
          Enter Postal Code
        </label>
        <input
          type="text"
          id="postalCode"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md max-w-[200px]"
        />
      </div>

      <Button name={"Search"} onClick={handleSearch} normalBtn />

      {error && <div className="text-red-500 mt-4">{error}</div>}
      <h2 className="text-lg font-bold mb-2 mt-[4px]">Delivery Costs</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 mt-4">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b  bg-[#F0E4F2] text-start">
                Postal Code
              </th>
              <th className="px-4 py-2 border-b  bg-[#F0E4F2] text-start">
                Suburb Name
              </th>
              <th className="px-4 py-2 border-b  bg-[#F0E4F2] text-start">
                City Name
              </th>
              <th className="px-4 py-2 border-b  bg-[#F0E4F2] text-start">
                State Name
              </th>
              <th className="px-4 py-2 border-b  bg-[#F0E4F2] text-start">
                Order Value
              </th>
              <th className="px-4 py-2 border-b  bg-[#F0E4F2] text-start">
                Delivery Cost
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredDeliveryCosts.map((state, stateIndex) =>
              state.cities.map((city, cityIndex) =>
                city.suburbs.map((suburb, suburbIndex) =>
                  suburb.delivery_costs.thresholds.map(
                    (threshold, thresholdIndex) => (
                      <tr
                        key={`${stateIndex}-${cityIndex}-${suburbIndex}-${thresholdIndex}`}
                      >
                        <td className="px-4 py-2 border-b text-start">
                          {renderPostalCodes(suburb.postalCodes)}
                        </td>
                        <td className="px-4 py-2 border-b text-start">
                          {suburb.suburbName}
                        </td>
                        <td className="px-4 py-2 border-b text-start">
                          {city.cityName}
                        </td>
                        <td className="px-4 py-2 border-b text-start">
                          {state.stateName}
                        </td>
                        <td className="px-4 py-2 border-b text-start">
                          {threshold.orderValue} $
                        </td>
                        <td className="px-4 py-2 border-b text-start">
                          {threshold.cost} $
                        </td>
                      </tr>
                    )
                  )
                )
              )
            )}
          </tbody>
        </table>
      </div>
      <Link
        href="/"
        className="flex gap-[8px] items-center mt-[10px] text-[#612F69] text-[18px]"
      >
        <IoMdArrowRoundBack className=" cursor-pointer" />
        <p>Home</p>
      </Link>
    </div>
  );
};

export default DeliveryCostTabel;
