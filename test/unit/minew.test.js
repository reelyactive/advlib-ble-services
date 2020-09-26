/**
 * Copyright reelyActive 2015-2020
 * We believe in an open Internet of Things
 */


const service = require('../../lib/minew.js');
const assert = require ('assert');


// Input data for the scenario
const INPUT_DATA_INVALID_INPUT = 'ff';
const INPUT_DATA_TEMPERATURE_HUMIDITY = 'a1016315803200aabbccddeeff';
const INPUT_DATA_VISIBLE_LIGHT = 'a1024501aabbccddeeff';
const INPUT_DATA_ACCELERATION = 'a10364ff8000000080aabbccddeeff';
const INPUT_DATA_NAME = 'a10801aabbccddeeff504c5553';


// Expected outputs for the scenario
const EXPECTED_DATA_INVALID_INPUT = null;
const EXPECTED_DATA_TEMPERATURE_HUMIDITY = {
    batteryPercentage: 99,
    temperature: 21.5,
    relativeHumidity: 50.0
};
const EXPECTED_DATA_VISIBLE_LIGHT = {
    batteryPercentage: 69,
    isVisibleLight: true
};
const EXPECTED_DATA_ACCELERATION = {
    batteryPercentage: 100,
    acceleration: [ -0.5, 0.0, 0.5 ]
};
const EXPECTED_DATA_NAME = {
    batteryPercentage: 1,
    name: "PLUS"
};


// Describe the scenario
describe('minew', function() {

  // Test the process function with no input data
  it('should handle no input data', function() {
    assert.deepEqual(service.process(), EXPECTED_DATA_INVALID_INPUT);
  });

  // Test the process function with invalid data
  it('should handle invalid data as input', function() {
    assert.deepEqual(service.process(INPUT_DATA_INVALID_INPUT),
                     EXPECTED_DATA_INVALID_INPUT);
  });

  // Test the process function with valid temperature and humidity data
  it('should handle valid temperature and humidity data as input', function() {
    assert.deepEqual(service.process(INPUT_DATA_TEMPERATURE_HUMIDITY),
                     EXPECTED_DATA_TEMPERATURE_HUMIDITY);
  });

  // Test the process function with valid visible light data
  it('should handle valid visible light data as input', function() {
    assert.deepEqual(service.process(INPUT_DATA_VISIBLE_LIGHT),
                     EXPECTED_DATA_VISIBLE_LIGHT);
  });

  // Test the process function with valid acceleration data
  it('should handle valid acceleration data as input', function() {
    assert.deepEqual(service.process(INPUT_DATA_ACCELERATION),
                     EXPECTED_DATA_ACCELERATION);
  });

  // Test the process function with valid name data
  it('should handle valid name data as input', function() {
    assert.deepEqual(service.process(INPUT_DATA_NAME), EXPECTED_DATA_NAME);
  });

});