/**
 * Copyright reelyActive 2021-2024
 * We believe in an open Internet of Things
 */


const service = require('../../lib/gatt.js');
const assert = require ('assert');


// Input data for the scenario
const INPUT_UUID_INVALID = 'ffff';
const INPUT_DATA_BATTERY_LEVEL = '45';
const INPUT_UUID_BATTERY_LEVEL = '2a19';
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
const INPUT_DATA_HUMIDITY = '391b';
const INPUT_UUID_HUMIDITY = '2a6f';
const INPUT_DATA_MFD3D_POSITIVE = 'f4010000e803';
const INPUT_DATA_MFD3D_NEGATIVE = '0cfeffff18fc';
const INPUT_UUID_MFD3D = '2aa1';
const INPUT_DATA_LANGUAGE = '6672';
const INPUT_UUID_LANGUAGE = '2aa2';
const INPUT_DATA_ELECTRIC_CURRENT = '3930';
const INPUT_UUID_ELECTRIC_CURRENT = '2aee';
const INPUT_DATA_GENERIC_LEVEL = '971f';
const INPUT_UUID_GENERIC_LEVEL = '2af9';
const INPUT_DATA_ILLUMINANCE_UNKNOWN = 'ffffff';
const INPUT_DATA_ILLUMINANCE = 'a08601';
const INPUT_UUID_ILLUMINANCE = '2afb';
const INPUT_DATA_CO2_CONCENTRATION_UNKNOWN = 'ffff';
const INPUT_DATA_CO2_CONCENTRATION = 'de03';
const INPUT_UUID_CO2_CONCENTRATION = '2b8c';
const INPUT_DATA_AMMONIA_CONCENTRATION = '7bb0';
const INPUT_UUID_AMMONIA_CONCENTRATION = '2bcf';
const INPUT_DATA_CARBON_MONOXIDE_CONCENTRATION = '9ad2';
const INPUT_UUID_CARBON_MONOXIDE_CONCENTRATION = '2bd0';
const INPUT_DATA_METHANE_CONCENTRATION = '7b30';
const INPUT_UUID_METHANE_CONCENTRATION = '2bd1';
const INPUT_DATA_NO2_CONCENTRATION = '9ad2';
const INPUT_UUID_NO2_CONCENTRATION = '2bd2';
const INPUT_DATA_VOC_CONCENTRATION_UNKNOWN = 'ffff';
const INPUT_DATA_NOISE = '7b';
const INPUT_UUID_NOISE = '2be4';
const INPUT_DATA_VOC_CONCENTRATION = 'de03';
const INPUT_UUID_VOC_CONCENTRATION = '2be7';


// Expected outputs for the scenario
const EXPECTED_DATA_INVALID_INPUT = null;
const EXPECTED_DATA_BATTERY_LEVEL = { batteryPercentage: 69 };
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
const EXPECTED_DATA_HUMIDITY = { relativeHumidity: 69.69 };
const EXPECTED_DATA_MFD3D_POSITIVE = { magneticField: [ 0.5, 0, 1 ] };
const EXPECTED_DATA_MFD3D_NEGATIVE = { magneticField: [ -0.5, -0.001, -1 ] };
const EXPECTED_DATA_ILLUMINANCE_UNKNOWN = null;
const EXPECTED_DATA_ILLUMINANCE = { illuminance: 1000 };
const EXPECTED_DATA_LANGUAGE = { languages: [ 'fr' ] };
const EXPECTED_DATA_ELECTRIC_CURRENT = { amperage: 123.45 };
const EXPECTED_DATA_GENERIC_LEVEL = { levelPercentage: 12.339971007858397 };
const EXPECTED_DATA_CO2_CONCENTRATION_UNKNOWN = null;
const EXPECTED_DATA_CO2_CONCENTRATION = { carbonDioxideConcentration: 990 };
const EXPECTED_DATA_AMMONIA_CONCENTRATION = { ammoniaConcentration: 1.23 };
const EXPECTED_DATA_CARBON_MONOXIDE_CONCENTRATION = {
     carbonMonoxideConcentration: 666
};
const EXPECTED_DATA_METHANE_CONCENTRATION = { methaneConcentration: 123 };
const EXPECTED_DATA_NO2_CONCENTRATION = { nitrogenDioxideConcentration: 666 };
const EXPECTED_DATA_NOISE = { soundPressure: 123 };
const EXPECTED_DATA_VOC_CONCENTRATION_UNKNOWN = null;
const EXPECTED_DATA_VOC_CONCENTRATION = {
    volatileOrganicCompoundsConcentration: 0.99
};


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

  // Test the process function with battery level data
  it('should handle battery level data as input', function() {
    assert.deepEqual(service.process(INPUT_DATA_BATTERY_LEVEL,
                                     INPUT_UUID_BATTERY_LEVEL),
                     EXPECTED_DATA_BATTERY_LEVEL);
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

  // Test the process function with humidity data
  it('should handle humidity data as input', function() {
    assert.deepEqual(service.process(INPUT_DATA_HUMIDITY, INPUT_UUID_HUMIDITY),
                     EXPECTED_DATA_HUMIDITY);
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

  // Test the process function with language data
  it('should handle language data as input', function() {
    assert.deepEqual(service.process(INPUT_DATA_LANGUAGE,
                     INPUT_UUID_LANGUAGE), EXPECTED_DATA_LANGUAGE);
  });

  // Test the process function with electric current data
  it('should handle electric current data as input', function() {
    assert.deepEqual(service.process(INPUT_DATA_ELECTRIC_CURRENT,
                                     INPUT_UUID_ELECTRIC_CURRENT),
                     EXPECTED_DATA_ELECTRIC_CURRENT);
  });

  // Test the process function with generic level data
  it('should handle generic level data as input', function() {
    assert.deepEqual(service.process(INPUT_DATA_GENERIC_LEVEL,
                     INPUT_UUID_GENERIC_LEVEL), EXPECTED_DATA_GENERIC_LEVEL);
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

  // Test the process function with unknown CO2 concentration data
  it('should handle unknown CO2 concentration data as input', function() {
    assert.deepEqual(service.process(INPUT_DATA_CO2_CONCENTRATION_UNKNOWN,
                                     INPUT_UUID_CO2_CONCENTRATION),
                     EXPECTED_DATA_CO2_CONCENTRATION_UNKNOWN);
  });

  // Test the process function with CO2 concentration data
  it('should handle CO2 concentration data as input', function() {
    assert.deepEqual(service.process(INPUT_DATA_CO2_CONCENTRATION,
                                     INPUT_UUID_CO2_CONCENTRATION),
                     EXPECTED_DATA_CO2_CONCENTRATION);
  });

  // Test the process function with ammonia concentration data
  it('should handle ammonia concentration data as input', function() {
    assert.deepEqual(service.process(INPUT_DATA_AMMONIA_CONCENTRATION,
                                     INPUT_UUID_AMMONIA_CONCENTRATION),
                     EXPECTED_DATA_AMMONIA_CONCENTRATION);
  });

  // Test the process function with carbon monoxide concentration data
  it('should handle carbon monoxide concentration data as input', function() {
    assert.deepEqual(service.process(INPUT_DATA_CARBON_MONOXIDE_CONCENTRATION,
                                     INPUT_UUID_CARBON_MONOXIDE_CONCENTRATION),
                     EXPECTED_DATA_CARBON_MONOXIDE_CONCENTRATION);
  });

  // Test the process function with methane concentration data
  it('should handle methane concentration data as input', function() {
    assert.deepEqual(service.process(INPUT_DATA_METHANE_CONCENTRATION,
                                     INPUT_UUID_METHANE_CONCENTRATION),
                     EXPECTED_DATA_METHANE_CONCENTRATION);
  });

  // Test the process function with NO2 concentration data
  it('should handle NO2 concentration data as input', function() {
    assert.deepEqual(service.process(INPUT_DATA_NO2_CONCENTRATION,
                                     INPUT_UUID_NO2_CONCENTRATION),
                     EXPECTED_DATA_NO2_CONCENTRATION);
  });

  // Test the process function with noise data
  it('should handle noise data as input', function() {
    assert.deepEqual(service.process(INPUT_DATA_NOISE, INPUT_UUID_NOISE),
                     EXPECTED_DATA_NOISE);
  });

  // Test the process function with unknown VOC concentration data
  it('should handle unknown VOC concentration data as input', function() {
    assert.deepEqual(service.process(INPUT_DATA_VOC_CONCENTRATION_UNKNOWN,
                                     INPUT_UUID_VOC_CONCENTRATION),
                     EXPECTED_DATA_VOC_CONCENTRATION_UNKNOWN);
  });

  // Test the process function with VOC concentration data
  it('should handle VOC concentration data as input', function() {
    assert.deepEqual(service.process(INPUT_DATA_VOC_CONCENTRATION,
                                     INPUT_UUID_VOC_CONCENTRATION),
                     EXPECTED_DATA_VOC_CONCENTRATION);
  });

});