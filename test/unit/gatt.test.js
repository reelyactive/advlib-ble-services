/**
 * Copyright reelyActive 2021
 * We believe in an open Internet of Things
 */


const service = require('../../lib/gatt.js');
const assert = require ('assert');


// Input data for the scenario
const INPUT_UUID_INVALID = 'ffff';
const INPUT_DATA_HRM_MIN = '007b';
const INPUT_DATA_HRM_ALL = '1f7b00230100040002';
const INPUT_UUID_HRM = '2a37';
const INPUT_DATA_TEMPERATURE_UNKNOWN = '0080';
const INPUT_DATA_TEMPERATURE_POSITIVE = '3408';
const INPUT_DATA_TEMPERATURE_NEGATIVE = '2efb';
const INPUT_UUID_TEMPERATURE = '2a6e';


// Expected outputs for the scenario
const EXPECTED_DATA_INVALID_INPUT = null;
const EXPECTED_DATA_HRM_MIN = { heartRate: 123 };
const EXPECTED_DATA_HRM_ALL = {
    heartRate: 123,
    isSensorContactDetected: true,
    energyExpended: 291,
    rrIntervals: [ 1.0, 0.5 ]
};
const EXPECTED_DATA_TEMPERATURE_UNKNOWN = null;
const EXPECTED_DATA_TEMPERATURE_POSITIVE = { temperature: 21 };
const EXPECTED_DATA_TEMPERATURE_NEGATIVE = { temperature: -12.34 };


// Describe the scenario
describe('gatt', function() {

  // Test the process function with no input data
  it('should handle no input data', function() {
    assert.deepEqual(service.process(), EXPECTED_DATA_INVALID_INPUT);
  });

  // Test the process function with an invalid UUID
  it('should handle an invalid UUID as input', function() {
    assert.deepEqual(service.process(null, INPUT_UUID_INVALID),
                     EXPECTED_DATA_INVALID_INPUT);
  });

  // Test the process function with minimal HRM data
  it('should handle minimal HRM data as input', function() {
    assert.deepEqual(service.process(INPUT_DATA_HRM_MIN, INPUT_UUID_HRM),
                     EXPECTED_DATA_HRM_MIN);
  });

  // Test the process function with all HRM data
  it('should handle all HRM data as input', function() {
    assert.deepEqual(service.process(INPUT_DATA_HRM_ALL, INPUT_UUID_HRM),
                     EXPECTED_DATA_HRM_ALL);
  });

  // Test the process function with unknown temperature data
  it('should handle unknown temperature data as input', function() {
    assert.deepEqual(service.process(INPUT_DATA_TEMPERATURE_UNKNOWN,
                     INPUT_UUID_TEMPERATURE),
                     EXPECTED_DATA_TEMPERATURE_UNKNOWN);
  });

  // Test the process function with positive temperature data
  it('should handle positive temperature data as input', function() {
    assert.deepEqual(service.process(INPUT_DATA_TEMPERATURE_POSITIVE,
                     INPUT_UUID_TEMPERATURE),
                     EXPECTED_DATA_TEMPERATURE_POSITIVE);
  });

  // Test the process function with negative temperature data
  it('should handle negative temperature data as input', function() {
    assert.deepEqual(service.process(INPUT_DATA_TEMPERATURE_NEGATIVE,
                     INPUT_UUID_TEMPERATURE),
                     EXPECTED_DATA_TEMPERATURE_NEGATIVE);
  });

});