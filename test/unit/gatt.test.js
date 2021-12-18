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
const INPUT_DATA_LAS_ELEVATION = '0800393000';
const INPUT_DATA_LAS_ALL = '1f00d20487d6123c1a201b9cec25d4393000f41a00';
const INPUT_UUID_LAS = '2a67';
const INPUT_DATA_ELEVATION_POSITIVE = '393000';
const INPUT_DATA_ELEVATION_NEGATIVE = 'ffffff';
const INPUT_UUID_ELEVATION = '2a6c';
const INPUT_DATA_PRESSURE = '02760f00';
const INPUT_UUID_PRESSURE = '2a6d';
const INPUT_DATA_TEMPERATURE_UNKNOWN = '0080';
const INPUT_DATA_TEMPERATURE_POSITIVE = '3408';
const INPUT_DATA_TEMPERATURE_NEGATIVE = '2efb';
const INPUT_UUID_TEMPERATURE = '2a6e';
const INPUT_DATA_MFD3D_POSITIVE = 'f4010000e803';
const INPUT_DATA_MFD3D_NEGATIVE = '0cfeffff18fc';
const INPUT_UUID_MFD3D = '2aa1';
const INPUT_DATA_ILLUMINANCE_UNKNOWN = 'ffffff';
const INPUT_DATA_ILLUMINANCE = 'a08601';
const INPUT_UUID_ILLUMINANCE = '2afb';


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
    position: [ -73.57121, 45.50887, 123.45 ]
};
const EXPECTED_DATA_LAS_ELEVATION = { elevation: 123.45 };
const EXPECTED_DATA_LAS_ALL = {
    speed: 12.34,
    distance: 123456.7,
    position: [ -73.57121, 45.50887, 123.45 ],
    heading: 69
};
const EXPECTED_DATA_ELEVATION_POSITIVE = { elevation: 123.45 };
const EXPECTED_DATA_ELEVATION_NEGATIVE = { elevation: -0.01 };
const EXPECTED_DATA_PRESSURE = { pressure: 101325.0 };
const EXPECTED_DATA_TEMPERATURE_UNKNOWN = null;
const EXPECTED_DATA_TEMPERATURE_POSITIVE = { temperature: 21 };
const EXPECTED_DATA_TEMPERATURE_NEGATIVE = { temperature: -12.34 };
const EXPECTED_DATA_MFD3D_POSITIVE = { magneticField: [ 0.5, 0, 1 ] };
const EXPECTED_DATA_MFD3D_NEGATIVE = { magneticField: [ -0.5, -0.001, -1 ] };
const EXPECTED_DATA_ILLUMINANCE_UNKNOWN = null;
const EXPECTED_DATA_ILLUMINANCE = { illuminance: 1000 };


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

  // Test the process function with elevation LaS data
  it('should handle elevation LaS data as input', function() {
    assert.deepEqual(service.process(INPUT_DATA_LAS_ELEVATION, INPUT_UUID_LAS),
                     EXPECTED_DATA_LAS_ELEVATION);
  });

  // Test the process function with complete LaS data
  it('should handle complete LaS data as input', function() {
    assert.deepEqual(service.process(INPUT_DATA_LAS_ALL, INPUT_UUID_LAS),
                     EXPECTED_DATA_LAS_ALL);
  });

  // Test the process function with positive elevation data
  it('should handle positive elevation data as input', function() {
    assert.deepEqual(service.process(INPUT_DATA_ELEVATION_POSITIVE,
                     INPUT_UUID_ELEVATION), EXPECTED_DATA_ELEVATION_POSITIVE);
  });

  // Test the process function with negative elevation data
  it('should handle negative elevation data as input', function() {
    assert.deepEqual(service.process(INPUT_DATA_ELEVATION_NEGATIVE,
                     INPUT_UUID_ELEVATION), EXPECTED_DATA_ELEVATION_NEGATIVE);
  });

  // Test the process function with pressure data
  it('should handle pressure data as input', function() {
    assert.deepEqual(service.process(INPUT_DATA_PRESSURE, INPUT_UUID_PRESSURE),
                     EXPECTED_DATA_PRESSURE);
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

  // Test the process function with positive magnetic flux density data
  it('should handle positive magnetic flux density data as input', function() {
    assert.deepEqual(service.process(INPUT_DATA_MFD3D_POSITIVE,
                     INPUT_UUID_MFD3D), EXPECTED_DATA_MFD3D_POSITIVE);
  });

  // Test the process function with negative magnetic flux density data
  it('should handle negative magnetic flux density data as input', function() {
    assert.deepEqual(service.process(INPUT_DATA_MFD3D_NEGATIVE,
                     INPUT_UUID_MFD3D), EXPECTED_DATA_MFD3D_NEGATIVE);
  });

  // Test the process function with unknown illuminance data
  it('should handle unknown illuminance data as input', function() {
    assert.deepEqual(service.process(INPUT_DATA_ILLUMINANCE_UNKNOWN,
                     INPUT_UUID_ILLUMINANCE),
                     EXPECTED_DATA_ILLUMINANCE_UNKNOWN);
  });

  // Test the process function with illuminance data
  it('should handle illuminance data as input', function() {
    assert.deepEqual(service.process(INPUT_DATA_ILLUMINANCE,
                     INPUT_UUID_ILLUMINANCE), EXPECTED_DATA_ILLUMINANCE);
  });

});