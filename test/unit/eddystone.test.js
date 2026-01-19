/**
 * Copyright reelyActive 2015-2026
 * We believe in an open Internet of Things
 */


const service = require('../../lib/eddystone.js');
const assert = require ('assert');


// Input data for the scenario
const INPUT_DATA_INVALID_INPUT = 'ff';
const INPUT_DATA_EDDYSTONE_UID = '00fc00112233445566778899aabbccddeeff0000';
const INPUT_DATA_EDDYSTONE_URL = '10000367657470617265746f07';
const INPUT_DATA_EDDYSTONE_TLM = '20000bb815000000004500000258';
const INPUT_DATA_EDDYSTONE_ETLM = '2001112233445566778899aabbcc5a17c4ec';


// Expected outputs for the scenario
const EXPECTED_DATA_INVALID_INPUT = null;
const EXPECTED_DATA_EDDYSTONE_UID = {
    txPower: -4,
    deviceIds: [ "00112233445566778899/aabbccddeeff" ]
};
const EXPECTED_DATA_EDDYSTONE_URL = {
    txPower: 0,
    uri: "https://getpareto.com"
};
const EXPECTED_DATA_EDDYSTONE_TLM = {
    batteryVoltage: 3.0,
    temperature: 21.0,
    txCount: 69,
    uptime: 60000
};
const EXPECTED_DATA_EDDYSTONE_ETLM = {
    encrypted: { data: "112233445566778899aabbcc",
                 salt: 23063,
                 checksum: 50412,
                 method: "eddystone-etlm" }
};


// Describe the scenario
describe('eddystone', function() {

  // Test the process function with no input data
  it('should handle no input data', function() {
    assert.deepEqual(service.process(), EXPECTED_DATA_INVALID_INPUT);
  });

  // Test the process function with invalid data
  it('should handle a invalid data as input', function() {
    assert.deepEqual(service.process(INPUT_DATA_INVALID_INPUT),
                     EXPECTED_DATA_INVALID_INPUT);
  });

  // Test the process function with valid Eddystone UID data
  it('should handle valid Eddystone-UID data as input', function() {
    assert.deepEqual(service.process(INPUT_DATA_EDDYSTONE_UID),
                     EXPECTED_DATA_EDDYSTONE_UID);
  });

  // Test the process function with valid Eddystone URL data
  it('should handle valid Eddystone-URL data as input', function() {
    assert.deepEqual(service.process(INPUT_DATA_EDDYSTONE_URL),
                     EXPECTED_DATA_EDDYSTONE_URL);
  });

  // Test the process function with valid Eddystone TLM data
  it('should handle valid Eddystone-TLM data as input', function() {
    assert.deepEqual(service.process(INPUT_DATA_EDDYSTONE_TLM),
                     EXPECTED_DATA_EDDYSTONE_TLM);
  });

  // Test the process function with valid Eddystone ETLM data
  it('should handle valid Eddystone-ETLM data as input', function() {
    assert.deepEqual(service.process(INPUT_DATA_EDDYSTONE_ETLM),
                     EXPECTED_DATA_EDDYSTONE_ETLM);
  });

});