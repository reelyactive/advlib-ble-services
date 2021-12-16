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
const INPUT_DATA_LAS_MIN = '0000';
const INPUT_DATA_LAS_LATLONELE = '0c003c1a201b9cec25d4393000';
const INPUT_DATA_LAS_ALL = '1f00d20487d6123c1a201b9cec25d4393000f41a00';
const INPUT_UUID_LAS = '2a67';
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
const EXPECTED_DATA_LAS_MIN = {};
const EXPECTED_DATA_LAS_LATLONELE = {
    latitude: 45.50887,
    longitude: -73.57121,
    elevation: 123.45
};
const EXPECTED_DATA_LAS_ALL = {
    speed: 12.34,
    distance: 123456.7,
    latitude: 45.50887,
    longitude: -73.57121,
    elevation: 123.45,
    heading: 69
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

  // Test the process function with minimal LaS data
  it('should handle minimal LaS data as input', function() {
    assert.deepEqual(service.process(INPUT_DATA_LAS_MIN, INPUT_UUID_LAS),
                     EXPECTED_DATA_LAS_MIN);
  });

  // Test the process function with lat/lon/ele LaS data
  it('should handle lat/lon/ele LaS data as input', function() {
    assert.deepEqual(service.process(INPUT_DATA_LAS_LATLONELE, INPUT_UUID_LAS),
                     EXPECTED_DATA_LAS_LATLONELE);
  });

  // Test the process function with complete LaS data
  it('should handle complete LaS data as input', function() {
    assert.deepEqual(service.process(INPUT_DATA_LAS_ALL, INPUT_UUID_LAS),
                     EXPECTED_DATA_LAS_ALL);
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