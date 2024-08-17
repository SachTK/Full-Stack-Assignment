'use client';

import React from 'react';
import { Formik, Field, Form, FieldArray } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const MyForm = () => {
  const initialValues = {
    stateName: '',
    cities: [
      {
        cityName: '',
        suburbs: [
          {
            suburbName: '',
            state: '',
            postalCodes: '',
            delivery_costs: {
              thresholds: [{ orderValue: '', cost: '' }],
            },
            pickup_options: {
              thresholds: [{ orderValue: '', cost: '' }],
            },
          },
        ],
      },
    ],
  };

  const validationSchema = Yup.object({
    stateName: Yup.string().required('State name is required'),
    cities: Yup.array().of(
      Yup.object({
        cityName: Yup.string().required('City name is required'),
        suburbs: Yup.array().of(
          Yup.object({
            suburbName: Yup.string().required('Suburb name is required'),
            postalCodes: Yup.string().required('Postal code is required'),
            delivery_costs: Yup.object({
              thresholds: Yup.array().of(
                Yup.object({
                  orderValue: Yup.number().required('Order value is required'),
                  cost: Yup.number().required('Cost is required'),
                })
              ),
            }),
            pickup_options: Yup.object({
              thresholds: Yup.array().of(
                Yup.object({
                  orderValue: Yup.number().required('Order value is required'),
                  cost: Yup.number().required('Cost is required'),
                })
              ),
            }),
          })
        ),
      })
    ),
  });

  const handleSubmit = (values) => {
    console.log('Form submitted', values);
    axios
      .post('/api/states', values)
      .then((response) => {
        console.log('Form submitted successfully', response.data);
      })
      .catch((error) => {
        console.error('Error submitting form', error);
      });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">State Information</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values }) => (
          <Form>
            <div className="mb-4">
              <label htmlFor="stateName" className="block text-sm font-medium text-gray-700">
                State Name
              </label>
              <Field
                name="stateName"
                type="text"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <FieldArray name="cities">
              {({ insert, remove, push }) => (
                <div>
                  {values.cities.map((city, cityIndex) => (
                    <div key={cityIndex} className="mb-6">
                      <h3 className="text-lg font-bold mb-2">City {cityIndex + 1}</h3>
                      <div className="mb-4">
                        <label
                          htmlFor={`cities.${cityIndex}.cityName`} 
                          className="block text-sm font-medium text-gray-700"
                        >
                          City Name
                        </label>
                        <Field
                          name={`cities.${cityIndex}.cityName`} 
                          type="text"
                          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        />
                      </div>

                      <FieldArray name={`cities.${cityIndex}.suburbs`}>
                        {({ insert, remove, push }) => (
                          <>
                            {city.suburbs.map((suburb, suburbIndex) => (
                              <div key={suburbIndex} className="mb-4">
                                <h4 className="text-md font-bold mb-2">
                                  Suburb {suburbIndex + 1}
                                </h4>
                                <div className="mb-4">
                                  <label
                                    htmlFor={`cities.${cityIndex}.suburbs.${suburbIndex}.suburbName`}  
                                    className="block text-sm font-medium text-gray-700"
                                  >
                                    Suburb Name
                                  </label>
                                  <Field
                                    name={`cities.${cityIndex}.suburbs.${suburbIndex}.suburbName`}  
                                    type="text"
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                  />
                                </div>
                                <div className="mb-4">
                                  <label
                                    htmlFor={`cities.${cityIndex}.suburbs.${suburbIndex}.postalCodes`}  
                                    className="block text-sm font-medium text-gray-700"
                                  >
                                    Postal Codes
                                  </label>
                                  <Field
                                    name={`cities.${cityIndex}.suburbs.${suburbIndex}.postalCodes`}  
                                    type="text"
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                  />
                                </div>

                                <h5 className="font-semibold">Delivery Costs</h5>
                                <FieldArray
                                  name={`cities.${cityIndex}.suburbs.${suburbIndex}.delivery_costs.thresholds`}  
                                >
                                  {({ insert, remove, push }) => (
                                    <div>
                                      {suburb.delivery_costs.thresholds.map(
                                        (threshold, index) => (
                                          <div key={index} className="mb-2">
                                            <div className="flex space-x-2">
                                              <Field
                                                name={`cities.${cityIndex}.suburbs.${suburbIndex}.delivery_costs.thresholds.${index}.orderValue`}  
                                                type="number"
                                                placeholder="Order Value"
                                                className="p-2 border border-gray-300 rounded-md"
                                              />
                                              <Field
                                                name={`cities.${cityIndex}.suburbs.${suburbIndex}.delivery_costs.thresholds.${index}.cost`}  
                                                type="number"
                                                placeholder="Cost"
                                                className="p-2 border border-gray-300 rounded-md"
                                              />
                                              <button
                                                type="button"
                                                className="text-red-500"
                                                onClick={() => remove(index)}
                                              >
                                                X
                                              </button>
                                            </div>
                                          </div>
                                        )
                                      )}
                                      <button
                                        type="button"
                                        className="text-blue-500"
                                        onClick={() =>
                                          push({ orderValue: '', cost: '' })
                                        }
                                      >
                                        Add Delivery Threshold
                                      </button>
                                    </div>
                                  )}
                                </FieldArray>

                                <h5 className="font-semibold">Pickup Options</h5>
                                <FieldArray
                                  name={`cities.${cityIndex}.suburbs.${suburbIndex}.pickup_options.thresholds`}  
                                >
                                  {({ insert, remove, push }) => (
                                    <div>
                                      {suburb.pickup_options.thresholds.map(
                                        (threshold, index) => (
                                          <div key={index} className="mb-2">
                                            <div className="flex space-x-2">
                                              <Field
                                                name={`cities.${cityIndex}.suburbs.${suburbIndex}.pickup_options.thresholds.${index}.orderValue`}  
                                                type="number"
                                                placeholder="Order Value"
                                                className="p-2 border border-gray-300 rounded-md"
                                              />
                                              <Field
                                                name={`cities.${cityIndex}.suburbs.${suburbIndex}.pickup_options.thresholds.${index}.cost`}  
                                                type="number"
                                                placeholder="Cost"
                                                className="p-2 border border-gray-300 rounded-md"
                                              />
                                              <button
                                                type="button"
                                                className="text-red-500"
                                                onClick={() => remove(index)}
                                              >
                                                X
                                              </button>
                                            </div>
                                          </div>
                                        )
                                      )}
                                      <button
                                        type="button"
                                        className="text-blue-500"
                                        onClick={() =>
                                          push({ orderValue: '', cost: '' })
                                        }
                                      >
                                        Add Pickup Threshold
                                      </button>
                                    </div>
                                  )}
                                </FieldArray>

                              </div>
                            ))}
                            <button
                              type="button"
                              className="text-green-500"
                              onClick={() =>
                                push({
                                  suburbName: '',
                                  state: '',
                                  postalCodes: '',
                                  delivery_costs: { thresholds: [{ orderValue: '', cost: '' }] },
                                  pickup_options: { thresholds: [{ orderValue: '', cost: '' }] },
                                })
                              }
                            >
                              Add Suburb
                            </button>
                          </>
                        )}
                      </FieldArray>

                    </div>
                  ))}
                  <button
                    type="button"
                    className="text-green-500"
                    onClick={() =>
                      push({
                        cityName: '',
                        suburbs: [
                          {
                            suburbName: '',
                            state: '',
                            postalCodes: '',
                            delivery_costs: { thresholds: [{ orderValue: '', cost: '' }] },
                            pickup_options: { thresholds: [{ orderValue: '', cost: '' }] },
                          },
                        ],
                      })
                    }
                  >
                    Add City
                  </button>
                </div>
              )}
            </FieldArray>

            <button
              type="submit"
              className="mt-4 bg-blue-500 text-white p-2 rounded-md"
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default MyForm;
