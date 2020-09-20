/**
 * Copyright reelyActive 2020
 * We believe in an open Internet of Things
 */


const service = require("../../lib/exposurenotification.js");
const assert = require ('assert');


// Input data for the scenario
const INPUT_DATA_INVALID_INPUT = 'ff';
const INPUT_DATA_EXPOSURE_NOTIFICATION =
                                     '00112233445566778899aabbccddeeff40fc0000';


// Expected outputs for the scenario
const EXPECTED_DATA_INVALID_INPUT = null;
const EXPECTED_DATA_EXPOSURE_NOTIFICATION = {
    rollingProximityIdentifier: "00112233445566778899aabbccddeeff",
    version: 1.0,
    txPower: -4
};


// Describe the scenario
describe('exposurenotification', function() {

  // Test the process function with no input data
  it('should handle no input data', function() {
    assert.deepEqual(service.process(), EXPECTED_DATA_INVALID_INPUT);
  });

  // Test the process function with invalid data
  it('should handle a invalid data as input', function() {
    assert.deepEqual(service.process(INPUT_DATA_INVALID_INPUT),
                     EXPECTED_DATA_INVALID_INPUT);
  });

  // Test the process function with valid Exposure Notification data
  it('should handle valid Exposure Notification data as input', function() {
    assert.deepEqual(service.process(INPUT_DATA_EXPOSURE_NOTIFICATION),
                     EXPECTED_DATA_EXPOSURE_NOTIFICATION);
  });

});