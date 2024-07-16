/**
 * Copyright reelyActive 2024
 * We believe in an open Internet of Things
 */


const service = require('../../lib/hewlettpackardenterprise.js');
const assert = require ('assert');


// Input data for the scenario
const INPUT_DATA_INVALID_INPUT = 'ff';
const INPUT_DATA_POWER_LOCATION = '094002ce00304c4ad6a705470c0ad9ae200000040041';
const INPUT_DATA_FLOOR_LOCATION = '0942530f000c4e0d000a0a466966746820466c6f6f72';
const INPUT_DATA_IDENTITY = '094472030011223344550a73657269616c23313233850168706507';
const INPUT_DATA_SIGNATURE = '0947b50064a1d98fb65ae74d5195330420a1da80b882f9eb';


// Expected outputs for the scenario
const EXPECTED_DATA_INVALID_INPUT = null;
const EXPECTED_DATA_POWER_LOCATION = {
    // TODO: x/y/z uncertainty
    txPower: -50,
    isStationary: true,
    position: [ -121.97880798515105, 37.41924302039275, 4 ],
    uri: "https://sniffypedia.org/Organization/Hewlett_Packard_Enterprise_Company/"
};
const EXPECTED_DATA_FLOOR_LOCATION = {
    // TODO: x/y uncertainty
    position: [ 31.5, 25.7 ],
    floorId: "Fifth Floor",
    uri: "https://sniffypedia.org/Organization/Hewlett_Packard_Enterprise_Company/"
};
const EXPECTED_DATA_IDENTITY = {
    deviceIds: [ "001122334455/2" ],
    name: "serial#123",
    uri: "https://www.hpe.com"
};
const EXPECTED_DATA_SIGNATURE = {
    signature: {
      timestamp: 1688328591,
      messageAuthenticationCode: "b65ae74d5195330420a1da80b882f9eb"
    },
    uri: "https://sniffypedia.org/Organization/Hewlett_Packard_Enterprise_Company/"
};


// Describe the scenario
describe('hewlettpackardenterprise', function() {

  // Test the process function with no input data
  it('should handle no input data', function() {
    assert.deepEqual(service.process(), EXPECTED_DATA_INVALID_INPUT);
  });

  // Test the process function with invalid data
  it('should handle invalid data as input', function() {
    assert.deepEqual(service.process(INPUT_DATA_INVALID_INPUT),
                     EXPECTED_DATA_INVALID_INPUT);
  });

  // Test the process function with valid power and location data
  it('should handle valid power and location data as input', function() {
    assert.deepEqual(service.process(INPUT_DATA_POWER_LOCATION),
                     EXPECTED_DATA_POWER_LOCATION);
  });

  // Test the process function with valid floor location data
  it('should handle valid floor location data as input', function() {
    assert.deepEqual(service.process(INPUT_DATA_FLOOR_LOCATION),
                     EXPECTED_DATA_FLOOR_LOCATION);
  });

  // Test the process function with valid identity data
  it('should handle valid identity data as input', function() {
    assert.deepEqual(service.process(INPUT_DATA_IDENTITY),
                     EXPECTED_DATA_IDENTITY);
  });

  // Test the process function with valid signature data
  it('should handle valid signature data as input', function() {
    assert.deepEqual(service.process(INPUT_DATA_SIGNATURE),
                     EXPECTED_DATA_SIGNATURE);
  });

});
