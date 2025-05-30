/**
 * Copyright reelyActive 2015-2025
 * We believe in an open Internet of Things
 */


const service = require('../../lib/minew.js');
const assert = require ('assert');


// Input data for the scenario
const INPUT_DATA_INVALID_INPUT = 'ff';
const INPUT_DATA_TEMPERATURE_HUMIDITY = 'a1016315803200aabbccddeeff';
const INPUT_DATA_VISIBLE_LIGHT = 'a1024501aabbccddeeff';
const INPUT_DATA_ACCELERATION = 'a10364ff8000000080aabbccddeeff';
const INPUT_DATA_DFU = 'a107aabbccddeeff';
const INPUT_DATA_NAME = 'a10801aabbccddeeff504c5553';
const INPUT_DATA_PIR = 'a111320001aabbccddeeff';
const INPUT_DATA_TVOC = 'a112634000aabbccddeeff';
const INPUT_DATA_TEMPERATURE = 'a113631973aabbccddeeff';
const INPUT_DATA_MAGNETIC_FIELD = 'a1166400003380013baabbccddeeff';
const INPUT_DATA_VIBRATION = 'a118321234567801aabbccddeeff';
const INPUT_DATA_PHOTORESISTANCE = 'a119640ab4aabbccddeeff';
const INPUT_DATA_TAMPER = 'a1204501aabbccddeeff';
const INPUT_DATA_WATER_DETECTION = 'a1216301aabbccddeeff';


// Expected outputs for the scenario
const EXPECTED_DATA_INVALID_INPUT = null;
const EXPECTED_DATA_TEMPERATURE_HUMIDITY = {
    batteryPercentage: 99,
    temperature: 21.5,
    relativeHumidity: 50.0,
    uri: "https://sniffypedia.org/Organization/Shenzhen_Minew_Technologies_Co_Ltd/"
};
const EXPECTED_DATA_VISIBLE_LIGHT = {
    batteryPercentage: 69,
    isContactDetected: [ false ],
    uri: "https://sniffypedia.org/Organization/Shenzhen_Minew_Technologies_Co_Ltd/"
};
const EXPECTED_DATA_ACCELERATION = {
    batteryPercentage: 100,
    acceleration: [ -0.5, 0.0, 0.5 ],
    uri: "https://sniffypedia.org/Organization/Shenzhen_Minew_Technologies_Co_Ltd/"
};
const EXPECTED_DATA_DFU = {
    uri: "https://sniffypedia.org/Organization/Shenzhen_Minew_Technologies_Co_Ltd/"
};
const EXPECTED_DATA_NAME = {
    batteryPercentage: 1,
    name: "PLUS",
    uri: "https://sniffypedia.org/Organization/Shenzhen_Minew_Technologies_Co_Ltd/"
};
const EXPECTED_DATA_PIR = {
    batteryPercentage: 50,
    isMotionDetected: [ true ],
    uri: "https://sniffypedia.org/Organization/Shenzhen_Minew_Technologies_Co_Ltd/"
};
const EXPECTED_DATA_TVOC = {
    batteryPercentage: 99,
    volatileOrganicCompoundsConcentration: 16.384,
    uri: "https://sniffypedia.org/Organization/Shenzhen_Minew_Technologies_Co_Ltd/"
};
const EXPECTED_DATA_TEMPERATURE = {
    batteryPercentage: 99,
    temperature: 25.44921875,
    uri: "https://sniffypedia.org/Organization/Shenzhen_Minew_Technologies_Co_Ltd/"
};
const EXPECTED_DATA_MAGNETIC_FIELD = {
    batteryPercentage: 100,
    magneticField: [ 0, 0.515, 0.0123046875 ],
    uri: "https://sniffypedia.org/Organization/Shenzhen_Minew_Technologies_Co_Ltd/"
};
const EXPECTED_DATA_VIBRATION = {
    batteryPercentage: 50,
    isMotionDetected: [ true ],
    uri: "https://sniffypedia.org/Organization/Shenzhen_Minew_Technologies_Co_Ltd/"
};
const EXPECTED_DATA_PHOTORESISTANCE = {
    batteryPercentage: 100,
    luminousFlux: 2740,
    uri: "https://sniffypedia.org/Organization/Shenzhen_Minew_Technologies_Co_Ltd/"
};
const EXPECTED_DATA_TAMPER = {
    batteryPercentage: 69,
    isContactDetected: [ false ],
    uri: "https://sniffypedia.org/Organization/Shenzhen_Minew_Technologies_Co_Ltd/"
};
const EXPECTED_DATA_WATER_DETECTION = {
    batteryPercentage: 99,
    isLiquidDetected: [ true ],
    uri: "https://sniffypedia.org/Organization/Shenzhen_Minew_Technologies_Co_Ltd/"
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

  // Test the process function with valid DFU data
  it('should handle valid DFU data as input', function() {
    assert.deepEqual(service.process(INPUT_DATA_DFU), EXPECTED_DATA_DFU);
  });

  // Test the process function with valid name data
  it('should handle valid name data as input', function() {
    assert.deepEqual(service.process(INPUT_DATA_NAME), EXPECTED_DATA_NAME);
  });

  // Test the process function with valid passive infrared data
  it('should handle valid passive infrared data as input', function() {
    assert.deepEqual(service.process(INPUT_DATA_PIR),
                     EXPECTED_DATA_PIR);
  });

  // Test the process function with valid TVOC data
  it('should handle valid TVOC data as input', function() {
    assert.deepEqual(service.process(INPUT_DATA_TVOC), EXPECTED_DATA_TVOC);
  });

  // Test the process function with valid temperature data
  it('should handle valid temperature data as input', function() {
    assert.deepEqual(service.process(INPUT_DATA_TEMPERATURE),
                     EXPECTED_DATA_TEMPERATURE);
  });

  // Test the process function with valid magnetic field data
  it('should handle valid magnetic field data as input', function() {
    assert.deepEqual(service.process(INPUT_DATA_MAGNETIC_FIELD),
                     EXPECTED_DATA_MAGNETIC_FIELD);
  });

  // Test the process function with valid vibration data
  it('should handle valid vibration data as input', function() {
    assert.deepEqual(service.process(INPUT_DATA_VIBRATION),
                     EXPECTED_DATA_VIBRATION);
  });

  // Test the process function with valid photoresistance data
  it('should handle valid photoresistance data as input', function() {
    assert.deepEqual(service.process(INPUT_DATA_PHOTORESISTANCE),
                     EXPECTED_DATA_PHOTORESISTANCE);
  });

  // Test the process function with valid tamper data
  it('should handle valid tamper data as input', function() {
    assert.deepEqual(service.process(INPUT_DATA_TAMPER),
                     EXPECTED_DATA_TAMPER);
  });

  // Test the process function with valid water detection data
  it('should handle valid water detection data as input', function() {
    assert.deepEqual(service.process(INPUT_DATA_WATER_DETECTION),
                     EXPECTED_DATA_WATER_DETECTION);
  });

});
