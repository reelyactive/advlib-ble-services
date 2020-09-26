/**
 * Copyright reelyActive 2015-2020
 * We believe in an open Internet of Things
 */


const advlib = require('../../lib/advlibbleservices.js');
const assert = require ('assert');


// Input data for the scenario
const INPUT_DATA_INVALID_UUID = 'fail';
const INPUT_DATA_INVALID_HEX_STRING = 'xyz';
const INPUT_DATA_TOO_SHORT_BUFFER = Buffer.from('', 'hex');
const INPUT_DATA_EDDYSTONE_UUID = 'feaa';
const INPUT_DATA_EDDYSTONE_UID = '00fc00112233445566778899aabbccddeeff0000';


// Expected outputs for the scenario
const EXPECTED_DATA_INVALID_INPUT = null;
const EXPECTED_DATA_EDDYSTONE_UID = {
    txPower: -4,
    deviceIds: [ "00112233445566778899/aabbccddeeff" ]
}


// Describe the scenario
describe('advlib-ble-services', function() {

  // Test the process function with no input data
  it('should handle no input data', function() {
    assert.deepEqual(advlib.processServiceData(), EXPECTED_DATA_INVALID_INPUT);
  });

  // Test the process function with an invalid uuid
  it('should handle an invalid uuid as input', function() {
    assert.deepEqual(advlib.processServiceData(INPUT_DATA_INVALID_UUID),
                     EXPECTED_DATA_INVALID_INPUT);
  });

  // Test the process function with valid Eddystone UID data
  it('should handle valid service data as input', function() {
    assert.deepEqual(advlib.processServiceData(INPUT_DATA_EDDYSTONE_UUID,
                     INPUT_DATA_EDDYSTONE_UID), EXPECTED_DATA_EDDYSTONE_UID);
  });

});