/**
 * Copyright reelyActive 2026
 * We believe in an open Internet of Things
 */


const service = require('../../lib/bthome.js');
const assert = require ('assert');


// Input data for the scenario
const INPUT_DATA_INVALID_INPUT = 'ff';
const INPUT_DATA_TEMPERATURE_HUMIDITY = '4002c40903bf13';
const INPUT_DATA_PACKET_ID = '400009';
const INPUT_DATA_BATTERY = '400161';
const INPUT_DATA_TEMPERATURE_02 = '4002ca09';
const INPUT_DATA_HUMIDITY_03 = '4003bf13';
const INPUT_DATA_PRESSURE = '4004138a01';
const INPUT_DATA_ILLUMINANCE = '4005138a14';
const INPUT_DATA_COUNT_09 = '400960';
const INPUT_DATA_ENERGY_0A = '400a138a14';
const INPUT_DATA_POWER_0B = '400b021b00';
const INPUT_DATA_VOLTAGE_0C = '400c020c';
const INPUT_DATA_PM_2_5 = '400d120c';
const INPUT_DATA_PM_10 = '400e021c';
const INPUT_DATA_OPENING = '401100';
const INPUT_DATA_CO2 = '4012e204';
const INPUT_DATA_TVOC = '40133301';
const INPUT_DATA_CARBON_MONOXIDE = '401700';
const INPUT_DATA_DOOR = '401a00';
const INPUT_DATA_GARAGE_DOOR = '401b00';
const INPUT_DATA_GAS = '401c01';
const INPUT_DATA_LIGHT = '401e01';
const INPUT_DATA_MOISTURE = '402001';
const INPUT_DATA_MOTION = '402100';
const INPUT_DATA_MOVING = '402201';
const INPUT_DATA_OCCUPANCY = '402301';
const INPUT_DATA_PRESENCE = '402500';
const INPUT_DATA_PROBLEM = '402601';
const INPUT_DATA_SMOKE = '402901';
const INPUT_DATA_TAMPER = '402b00';
const INPUT_DATA_VIBRATION = '402c01';
const INPUT_DATA_WINDOW = '402d01';
const INPUT_DATA_HUMIDITY_2E = '402e23';
const INPUT_DATA_BUTTON = '403a02';
const INPUT_DATA_COUNT_3D = '403d0960';
const INPUT_DATA_COUNT_3E = '403e2a2c0960';
const INPUT_DATA_ROTATION = '403f020c';
const INPUT_DATA_DISTANCE_40 = '40400c00';
const INPUT_DATA_DISTANCE_41 = '40414e00';
const INPUT_DATA_DURATION = '40424e3400';
const INPUT_DATA_CURRENT_43 = '40434e34';
const INPUT_DATA_SPEED_44 = '40444e34';
const INPUT_DATA_TEMPERATURE_45 = '40451101';
const INPUT_DATA_VOLTAGE_4A = '404a020c';
const INPUT_DATA_ENERGY_4D = '404d12138a14';
const INPUT_DATA_ACCELERATION_51 = '40518756';
const INPUT_DATA_ACCELERATION_51_XYZ = '40518756518756518756';
const INPUT_DATA_GYROSCOPE = '40528756';
const INPUT_DATA_TEXT = '40530c48656c6c6f20576f726c6421';
const INPUT_DATA_RAW = '40540c48656c6c6f20576f726c6421';
const INPUT_DATA_TEMPERATURE_57 = '4057ea';
const INPUT_DATA_TEMPERATURE_58 = '4058ea';
const INPUT_DATA_COUNT_59 = '4059ea';
const INPUT_DATA_COUNT_5A = '405aeaea';
const INPUT_DATA_COUNT_5B = '405bea0234ea';
const INPUT_DATA_POWER_5C = '405c02fbffff';
const INPUT_DATA_CURRENT_5D = '405d02ea';
const INPUT_DATA_DIRECTION = '405e9f8c';
const INPUT_DATA_ROTATIONAL_SPEED = '4061ac0d';
const INPUT_DATA_SPEED_62 = '40624099dfff';
const INPUT_DATA_ACCELERATION_63 = '40630057d0ff';
const INPUT_DATA_DEVICE_TYPE_ID = '40f00100';
const INPUT_DATA_FIRMWARE_F1 = '40f100010204';
const INPUT_DATA_FIRMWARE_F2 = '40f2000106';
const INPUT_DATA_TEMPERATURES = '4002ca0945110157ea58ea';
const INPUT_DATA_ENCRYPTED = '41e445f3c9962b332211006c7c4519';


// Expected outputs for the scenario
const EXPECTED_DATA_INVALID_INPUT = null;
const EXPECTED_DATA_TEMPERATURE_HUMIDITY = {
    temperature: 25,
    relativeHumidity: 50.55,
    uri: "https://sniffypedia.org/Service/BTHome/"
};
const EXPECTED_DATA_PACKET_ID = {
    txCycle: 9,
    uri: "https://sniffypedia.org/Service/BTHome/"
};
const EXPECTED_DATA_BATTERY = {
    batteryPercentage: 97,
    uri: "https://sniffypedia.org/Service/BTHome/"
};
const EXPECTED_DATA_TEMPERATURE_02 = {
    temperature: 25.06,
    uri: "https://sniffypedia.org/Service/BTHome/"
};
const EXPECTED_DATA_HUMIDITY_03 = {
    relativeHumidity: 50.55,
    uri: "https://sniffypedia.org/Service/BTHome/"
};
const EXPECTED_DATA_PRESSURE = {
    pressure: 100883,
    uri: "https://sniffypedia.org/Service/BTHome/"
};
const EXPECTED_DATA_ILLUMINANCE = {
    illuminance: 13460.67,
    uri: "https://sniffypedia.org/Service/BTHome/"
};
const EXPECTED_DATA_COUNT_09 = {
    count: 96,
    uri: "https://sniffypedia.org/Service/BTHome/"
};
const EXPECTED_DATA_ENERGY_0A = {
    energy: 1346.067,
    uri: "https://sniffypedia.org/Service/BTHome/"
};
const EXPECTED_DATA_POWER_0B = {
    power: 69.14,
    uri: "https://sniffypedia.org/Service/BTHome/"
};
const EXPECTED_DATA_VOLTAGE_0C = {
    voltage: 3.074,
    uri: "https://sniffypedia.org/Service/BTHome/"
};
const EXPECTED_DATA_PM_2_5 = {
    "pm2.5": 3090,
    uri: "https://sniffypedia.org/Service/BTHome/"
};
const EXPECTED_DATA_PM_10 = {
    "pm10": 7170,
    uri: "https://sniffypedia.org/Service/BTHome/"
};
const EXPECTED_DATA_OPENING = {
    isContactDetected: [ true ],
    uri: "https://sniffypedia.org/Service/BTHome/"
};
const EXPECTED_DATA_CO2 = {
    carbonDioxideConcentration: 1250,
    uri: "https://sniffypedia.org/Service/BTHome/"
};
const EXPECTED_DATA_TVOC = {
    volatileOrganicCompoundsConcentration: Math.round(307 / 4.5),
    uri: "https://sniffypedia.org/Service/BTHome/"
};
const EXPECTED_DATA_CARBON_MONOXIDE = {
    isCarbonMonoxideDetected: [ false ],
    uri: "https://sniffypedia.org/Service/BTHome/"
};
const EXPECTED_DATA_DOOR = {
    isContactDetected: [ true ],
    uri: "https://sniffypedia.org/Service/BTHome/"
};
const EXPECTED_DATA_GARAGE_DOOR = {
    isContactDetected: [ true ],
    uri: "https://sniffypedia.org/Service/BTHome/"
};
const EXPECTED_DATA_GAS = {
    isGasDetected: [ true ],
    uri: "https://sniffypedia.org/Service/BTHome/"
};
const EXPECTED_DATA_LIGHT = {
    isLightDetected: [ true ],
    uri: "https://sniffypedia.org/Service/BTHome/"
};
const EXPECTED_DATA_MOISTURE = {
    isLiquidDetected: [ true ],
    uri: "https://sniffypedia.org/Service/BTHome/"
};
const EXPECTED_DATA_MOTION = {
    isMotionDetected: [ false ],
    uri: "https://sniffypedia.org/Service/BTHome/"
};
const EXPECTED_DATA_MOVING = {
    isMotionDetected: [ true ],
    uri: "https://sniffypedia.org/Service/BTHome/"
};
const EXPECTED_DATA_OCCUPANCY = {
    isOccupancyDetected: [ true ],
    uri: "https://sniffypedia.org/Service/BTHome/"
};
const EXPECTED_DATA_PRESENCE = {
    isOccupancyDetected: [ false ],
    uri: "https://sniffypedia.org/Service/BTHome/"
};
const EXPECTED_DATA_PROBLEM = {
    isHealthy: false,
    uri: "https://sniffypedia.org/Service/BTHome/"
};
const EXPECTED_DATA_SMOKE = {
    isSmokeDetected: [ true ],
    uri: "https://sniffypedia.org/Service/BTHome/"
};
const EXPECTED_DATA_TAMPER = {
    isTamperDetected: [ false ],
    uri: "https://sniffypedia.org/Service/BTHome/"
};
const EXPECTED_DATA_VIBRATION = {
    isMotionDetected: [ true ],
    uri: "https://sniffypedia.org/Service/BTHome/"
};
const EXPECTED_DATA_WINDOW = {
    isContactDetected: [ false ],
    uri: "https://sniffypedia.org/Service/BTHome/"
};
const EXPECTED_DATA_HUMIDITY_2E = {
    relativeHumidity: 35,
    uri: "https://sniffypedia.org/Service/BTHome/"
};
const EXPECTED_DATA_BUTTON = {
    isButtonPressed: [ true ],
    uri: "https://sniffypedia.org/Service/BTHome/"
};
const EXPECTED_DATA_COUNT_3D = {
    count: 24585,
    uri: "https://sniffypedia.org/Service/BTHome/"
};
const EXPECTED_DATA_COUNT_3E = {
    count: 1611213866,
    uri: "https://sniffypedia.org/Service/BTHome/"
};
const EXPECTED_DATA_ROTATION = {
    angleOfRotation: 307.4,
    uri: "https://sniffypedia.org/Service/BTHome/"
};
const EXPECTED_DATA_DISTANCE_40 = {
    distance: 0.012,
    uri: "https://sniffypedia.org/Service/BTHome/"
};
const EXPECTED_DATA_DISTANCE_41 = {
    distance: 7.8,
    uri: "https://sniffypedia.org/Service/BTHome/"
};
const EXPECTED_DATA_DURATION = {
    duration: 13.390,
    uri: "https://sniffypedia.org/Service/BTHome/"
};
const EXPECTED_DATA_CURRENT_43 = {
    amperage: 13.39,
    uri: "https://sniffypedia.org/Service/BTHome/"
};
const EXPECTED_DATA_SPEED_44 = {
    speed: 133.90,
    uri: "https://sniffypedia.org/Service/BTHome/"
};
const EXPECTED_DATA_TEMPERATURE_45 = {
    temperature: 27.3,
    uri: "https://sniffypedia.org/Service/BTHome/"
};
const EXPECTED_DATA_VOLTAGE_4A = {
    voltage: 307.4,
    uri: "https://sniffypedia.org/Service/BTHome/"
};
const EXPECTED_DATA_ENERGY_4D = {
    energy: 344593.170,
    uri: "https://sniffypedia.org/Service/BTHome/"
};
const EXPECTED_DATA_ACCELERATION_51 = {
    acceleration: [ 2.258773383367409 ],
    uri: "https://sniffypedia.org/Service/BTHome/"
};
const EXPECTED_DATA_ACCELERATION_51_XYZ = {
    acceleration: [ 2.258773383367409, 2.258773383367409, 2.258773383367409 ],
    uri: "https://sniffypedia.org/Service/BTHome/"
};
const EXPECTED_DATA_GYROSCOPE = {
    angularVelocity: 22.151,
    uri: "https://sniffypedia.org/Service/BTHome/"
};
const EXPECTED_DATA_TEXT = {
    text: "Hello World!",
    uri: "https://sniffypedia.org/Service/BTHome/"
};
const EXPECTED_DATA_RAW = {
    raw: "48656c6c6f20576f726c6421",
    uri: "https://sniffypedia.org/Service/BTHome/"
};
const EXPECTED_DATA_TEMPERATURE_57 = {
    temperature: -22,
    uri: "https://sniffypedia.org/Service/BTHome/"
};
const EXPECTED_DATA_TEMPERATURE_58 = {
    temperature: -7.699999999999999,
    uri: "https://sniffypedia.org/Service/BTHome/"
};
const EXPECTED_DATA_COUNT_59 = {
    count: -22,
    uri: "https://sniffypedia.org/Service/BTHome/"
};
const EXPECTED_DATA_COUNT_5A = {
    count: -5398,
    uri: "https://sniffypedia.org/Service/BTHome/"
};
const EXPECTED_DATA_COUNT_5B = {
    count: -365690134	,
    uri: "https://sniffypedia.org/Service/BTHome/"
};
const EXPECTED_DATA_POWER_5C = {
    power: -12.78,
    uri: "https://sniffypedia.org/Service/BTHome/"
};
const EXPECTED_DATA_CURRENT_5D = {
    amperage: -5.63,
    uri: "https://sniffypedia.org/Service/BTHome/"
};
const EXPECTED_DATA_DIRECTION = {
    heading: 359.99,
    uri: "https://sniffypedia.org/Service/BTHome/"
};
const EXPECTED_DATA_ROTATIONAL_SPEED = {
    angularVelocity: 21000,
    uri: "https://sniffypedia.org/Service/BTHome/"
};
const EXPECTED_DATA_SPEED_62 = {
    speed: -2.123456,
    uri: "https://sniffypedia.org/Service/BTHome/"
};
const EXPECTED_DATA_ACCELERATION_63 = {
    acceleration: [ -3.123456 ],
    uri: "https://sniffypedia.org/Service/BTHome/"
};
const EXPECTED_DATA_DEVICE_TYPE_ID = {
    deviceType: "1",
    uri: "https://sniffypedia.org/Service/BTHome/"
};
const EXPECTED_DATA_FIRMWARE_F1 = {
    firmwareVersion: "4.2.1.0",
    uri: "https://sniffypedia.org/Service/BTHome/"
};
const EXPECTED_DATA_FIRMWARE_F2 = {
    firmwareVersion: "6.1.0",
    uri: "https://sniffypedia.org/Service/BTHome/"
};
const EXPECTED_DATA_TEMPERATURES = {
    temperatures: [ 25.06, 27.3, -22, -7.699999999999999 ],
    uri: "https://sniffypedia.org/Service/BTHome/"
};
const EXPECTED_DATA_ENCRYPTED = {
    encrypted: { data: "e445f3c9962b",
                 salt: 1122867,
                 checksum: 423984236,
                 method: "bthome-v2" },
    uri: "https://sniffypedia.org/Service/BTHome/"
};


// Describe the scenario
describe('bthome', function() {

  // Test the process function with no input data
  it('should handle no input data', function() {
    assert.deepEqual(service.process(), EXPECTED_DATA_INVALID_INPUT);
  });

  // Test the process function with invalid data
  it('should handle invalid data as input', function() {
    assert.deepEqual(service.process(INPUT_DATA_INVALID_INPUT),
                     EXPECTED_DATA_INVALID_INPUT);
  });

  // Test the process function with valid temperature/humidity data
  it('should handle valid temperature/humidity data as input', function() {
    assert.deepEqual(service.process(INPUT_DATA_TEMPERATURE_HUMIDITY),
                     EXPECTED_DATA_TEMPERATURE_HUMIDITY);
  });

  // Test the process function with valid battery data
  it('should handle valid battery data as input', function() {
    assert.deepEqual(service.process(INPUT_DATA_BATTERY),
                     EXPECTED_DATA_BATTERY);
  });

  // Test the process function with valid packet id data
  it('should handle valid packet id data as input', function() {
    assert.deepEqual(service.process(INPUT_DATA_PACKET_ID),
                     EXPECTED_DATA_PACKET_ID);
  });

  // Test the process function with valid temperature data
  it('should handle valid temperature (0x02) data as input', function() {
    assert.deepEqual(service.process(INPUT_DATA_TEMPERATURE_02),
                     EXPECTED_DATA_TEMPERATURE_02);
  });

  // Test the process function with valid humidity data
  it('should handle valid humidity (0x03) data as input', function() {
    assert.deepEqual(service.process(INPUT_DATA_HUMIDITY_03),
                     EXPECTED_DATA_HUMIDITY_03);
  });

  // Test the process function with valid pressure data
  it('should handle valid pressure data as input', function() {
    assert.deepEqual(service.process(INPUT_DATA_PRESSURE),
                     EXPECTED_DATA_PRESSURE);
  });

  // Test the process function with valid illuminance data
  it('should handle valid illuminance data as input', function() {
    assert.deepEqual(service.process(INPUT_DATA_ILLUMINANCE),
                     EXPECTED_DATA_ILLUMINANCE);
  });

  // Test the process function with valid count data
  it('should handle valid count (0x09) data as input', function() {
    assert.deepEqual(service.process(INPUT_DATA_COUNT_09),
                     EXPECTED_DATA_COUNT_09);
  });

  // Test the process function with valid energy data
  it('should handle valid energy (0x0a) data as input', function() {
    assert.deepEqual(service.process(INPUT_DATA_ENERGY_0A),
                     EXPECTED_DATA_ENERGY_0A);
  });

  // Test the process function with valid power data
  it('should handle valid power (0x0b) data as input', function() {
    assert.deepEqual(service.process(INPUT_DATA_POWER_0B),
                     EXPECTED_DATA_POWER_0B);
  });

  // Test the process function with valid voltage data
  it('should handle valid voltage (0x0c) data as input', function() {
    assert.deepEqual(service.process(INPUT_DATA_VOLTAGE_0C),
                     EXPECTED_DATA_VOLTAGE_0C);
  });

  // Test the process function with valid pm2.5 data
  it('should handle valid pm2.5 data as input', function() {
    assert.deepEqual(service.process(INPUT_DATA_PM_2_5), EXPECTED_DATA_PM_2_5);
  });

  // Test the process function with valid pm10 data
  it('should handle valid pm10 data as input', function() {
    assert.deepEqual(service.process(INPUT_DATA_PM_10), EXPECTED_DATA_PM_10);
  });

  // Test the process function with valid opening data
  it('should handle valid opening data as input', function() {
    assert.deepEqual(service.process(INPUT_DATA_OPENING),
                     EXPECTED_DATA_OPENING);
  });

  // Test the process function with valid co2 data
  it('should handle valid co2 data as input', function() {
    assert.deepEqual(service.process(INPUT_DATA_CO2), EXPECTED_DATA_CO2);
  });

  // Test the process function with valid tvoc data
  it('should handle valid tvoc data as input', function() {
    assert.deepEqual(service.process(INPUT_DATA_TVOC),
                     EXPECTED_DATA_TVOC);
  });

  // Test the process function with valid carbon monoxide data
  it('should handle valid carbon monoxide data as input', function() {
    assert.deepEqual(service.process(INPUT_DATA_CARBON_MONOXIDE),
                     EXPECTED_DATA_CARBON_MONOXIDE);
  });

  // Test the process function with valid door data
  it('should handle valid door data as input', function() {
    assert.deepEqual(service.process(INPUT_DATA_DOOR), EXPECTED_DATA_DOOR);
  });

  // Test the process function with valid garage door data
  it('should handle valid garage door data as input', function() {
    assert.deepEqual(service.process(INPUT_DATA_GARAGE_DOOR),
                     EXPECTED_DATA_GARAGE_DOOR);
  });

  // Test the process function with valid gas data
  it('should handle valid gas data as input', function() {
    assert.deepEqual(service.process(INPUT_DATA_GAS), EXPECTED_DATA_GAS);
  });

  // Test the process function with valid light data
  it('should handle valid light data as input', function() {
    assert.deepEqual(service.process(INPUT_DATA_LIGHT), EXPECTED_DATA_LIGHT);
  });

  // Test the process function with valid moisture data
  it('should handle valid moisture data as input', function() {
    assert.deepEqual(service.process(INPUT_DATA_MOISTURE),
                                     EXPECTED_DATA_MOISTURE);
  });

  // Test the process function with valid motion data
  it('should handle valid motion data as input', function() {
    assert.deepEqual(service.process(INPUT_DATA_MOTION), EXPECTED_DATA_MOTION);
  });

  // Test the process function with valid moving data
  it('should handle valid moving data as input', function() {
    assert.deepEqual(service.process(INPUT_DATA_MOVING), EXPECTED_DATA_MOVING);
  });

  // Test the process function with valid occupancy data
  it('should handle valid occupancy data as input', function() {
    assert.deepEqual(service.process(INPUT_DATA_OCCUPANCY),
                                     EXPECTED_DATA_OCCUPANCY);
  });

  // Test the process function with valid presence data
  it('should handle valid presence data as input', function() {
    assert.deepEqual(service.process(INPUT_DATA_PRESENCE),
                                     EXPECTED_DATA_PRESENCE);
  });

  // Test the process function with valid problem data
  it('should handle valid problem data as input', function() {
    assert.deepEqual(service.process(INPUT_DATA_PROBLEM),
                                     EXPECTED_DATA_PROBLEM);
  });

  // Test the process function with valid smoke data
  it('should handle valid smoke data as input', function() {
    assert.deepEqual(service.process(INPUT_DATA_SMOKE), EXPECTED_DATA_SMOKE);
  });

  // Test the process function with valid tamper data
  it('should handle valid tamper data as input', function() {
    assert.deepEqual(service.process(INPUT_DATA_TAMPER), EXPECTED_DATA_TAMPER);
  });

  // Test the process function with valid vibration data
  it('should handle valid vibration data as input', function() {
    assert.deepEqual(service.process(INPUT_DATA_VIBRATION),
                                     EXPECTED_DATA_VIBRATION);
  });

  // Test the process function with valid window data
  it('should handle valid window data as input', function() {
    assert.deepEqual(service.process(INPUT_DATA_WINDOW), EXPECTED_DATA_WINDOW);
  });

  // Test the process function with valid humidity data
  it('should handle valid humidity (0x2e) data as input', function() {
    assert.deepEqual(service.process(INPUT_DATA_HUMIDITY_2E),
                     EXPECTED_DATA_HUMIDITY_2E);
  });

  // Test the process function with valid button data
  it('should handle valid button data as input', function() {
    assert.deepEqual(service.process(INPUT_DATA_BUTTON), EXPECTED_DATA_BUTTON);
  });

  // Test the process function with valid count data
  it('should handle valid count (0x3d) data as input', function() {
    assert.deepEqual(service.process(INPUT_DATA_COUNT_3D),
                     EXPECTED_DATA_COUNT_3D);
  });

  // Test the process function with valid count data
  it('should handle valid count (0x3e) data as input', function() {
    assert.deepEqual(service.process(INPUT_DATA_COUNT_3E),
                     EXPECTED_DATA_COUNT_3E);
  });

  // Test the process function with valid rotation data
  it('should handle valid rotation data as input', function() {
    assert.deepEqual(service.process(INPUT_DATA_ROTATION),
                     EXPECTED_DATA_ROTATION);
  });

  // Test the process function with valid distance data
  it('should handle valid distance (0x40) data as input', function() {
    assert.deepEqual(service.process(INPUT_DATA_DISTANCE_40),
                     EXPECTED_DATA_DISTANCE_40);
  });

  // Test the process function with valid distance data
  it('should handle valid distance (0x41) data as input', function() {
    assert.deepEqual(service.process(INPUT_DATA_DISTANCE_41),
                     EXPECTED_DATA_DISTANCE_41);
  });

  // Test the process function with valid duration data
  it('should handle valid duration data as input', function() {
    assert.deepEqual(service.process(INPUT_DATA_DURATION),
                     EXPECTED_DATA_DURATION);
  });

  // Test the process function with valid current data
  it('should handle valid current (0x43) data as input', function() {
    assert.deepEqual(service.process(INPUT_DATA_CURRENT_43),
                     EXPECTED_DATA_CURRENT_43);
  });

  // Test the process function with valid speed data
  it('should handle valid speed (0x44) data as input', function() {
    assert.deepEqual(service.process(INPUT_DATA_SPEED_44),
                     EXPECTED_DATA_SPEED_44);
  });

  // Test the process function with valid temperature data
  it('should handle valid temperature (0x45) data as input', function() {
    assert.deepEqual(service.process(INPUT_DATA_TEMPERATURE_45),
                     EXPECTED_DATA_TEMPERATURE_45);
  });

  // Test the process function with valid voltage data
  it('should handle valid voltage (0x4a) data as input', function() {
    assert.deepEqual(service.process(INPUT_DATA_VOLTAGE_4A),
                     EXPECTED_DATA_VOLTAGE_4A);
  });

  // Test the process function with valid energy data
  it('should handle valid energy (0x4d) data as input', function() {
    assert.deepEqual(service.process(INPUT_DATA_ENERGY_4D),
                     EXPECTED_DATA_ENERGY_4D);
  });

  // Test the process function with valid acceleration data
  it('should handle valid acceleration (0x51) data as input', function() {
    assert.deepEqual(service.process(INPUT_DATA_ACCELERATION_51),
                     EXPECTED_DATA_ACCELERATION_51);
  });

  // Test the process function with valid acceleration (x, y, z) data
  it('should handle valid xyz acceleration (0x51) data as input', function() {
    assert.deepEqual(service.process(INPUT_DATA_ACCELERATION_51_XYZ),
                     EXPECTED_DATA_ACCELERATION_51_XYZ);
  });

  // Test the process function with valid gyroscope data
  it('should handle valid gyroscope data as input', function() {
    assert.deepEqual(service.process(INPUT_DATA_GYROSCOPE),
                     EXPECTED_DATA_GYROSCOPE);
  });

  // Test the process function with valid text data
  it('should handle valid text data as input', function() {
    assert.deepEqual(service.process(INPUT_DATA_TEXT),
                     EXPECTED_DATA_TEXT);
  });

  // Test the process function with valid raw data
  it('should handle valid raw data as input', function() {
    assert.deepEqual(service.process(INPUT_DATA_RAW),
                     EXPECTED_DATA_RAW);
  });

  // Test the process function with valid temperature data
  it('should handle valid temperature (0x57) data as input', function() {
    assert.deepEqual(service.process(INPUT_DATA_TEMPERATURE_57),
                     EXPECTED_DATA_TEMPERATURE_57);
  });

  // Test the process function with valid temperature data
  it('should handle valid temperature (0x58) data as input', function() {
    assert.deepEqual(service.process(INPUT_DATA_TEMPERATURE_58),
                     EXPECTED_DATA_TEMPERATURE_58);
  });

  // Test the process function with valid count data
  it('should handle valid count (0x59) data as input', function() {
    assert.deepEqual(service.process(INPUT_DATA_COUNT_59),
                     EXPECTED_DATA_COUNT_59);
  });

  // Test the process function with valid count data
  it('should handle valid count (0x5a) data as input', function() {
    assert.deepEqual(service.process(INPUT_DATA_COUNT_5A),
                     EXPECTED_DATA_COUNT_5A);
  });

  // Test the process function with valid count data
  it('should handle valid count (0x5b) data as input', function() {
    assert.deepEqual(service.process(INPUT_DATA_COUNT_5B),
                     EXPECTED_DATA_COUNT_5B);
  });

  // Test the process function with valid power data
  it('should handle valid power (0x5c) data as input', function() {
    assert.deepEqual(service.process(INPUT_DATA_POWER_5C),
                     EXPECTED_DATA_POWER_5C);
  });

  // Test the process function with valid current data
  it('should handle valid current (0x5d) data as input', function() {
    assert.deepEqual(service.process(INPUT_DATA_CURRENT_5D),
                     EXPECTED_DATA_CURRENT_5D);
  });

  // Test the process function with valid direction data
  it('should handle valid direction data as input', function() {
    assert.deepEqual(service.process(INPUT_DATA_DIRECTION),
                     EXPECTED_DATA_DIRECTION);
  });

  // Test the process function with valid rotational speed data
  it('should handle valid rotational speed data as input', function() {
    assert.deepEqual(service.process(INPUT_DATA_ROTATIONAL_SPEED),
                     EXPECTED_DATA_ROTATIONAL_SPEED);
  });

  // Test the process function with valid speed data
  it('should handle valid speed (0x62) data as input', function() {
    assert.deepEqual(service.process(INPUT_DATA_SPEED_62),
                     EXPECTED_DATA_SPEED_62);
  });

  // Test the process function with valid acceleration data
  it('should handle valid acceleration (0x63) data as input', function() {
    assert.deepEqual(service.process(INPUT_DATA_ACCELERATION_63),
                     EXPECTED_DATA_ACCELERATION_63);
  });

  // Test the process function with valid device type id data
  it('should handle valid device type id data as input', function() {
    assert.deepEqual(service.process(INPUT_DATA_DEVICE_TYPE_ID),
                     EXPECTED_DATA_DEVICE_TYPE_ID);
  });

  // Test the process function with valid firmware data
  it('should handle valid firmware (0xf1) data as input', function() {
    assert.deepEqual(service.process(INPUT_DATA_FIRMWARE_F1),
                     EXPECTED_DATA_FIRMWARE_F1);
  });

  // Test the process function with valid firmware data
  it('should handle valid firmware (0xf2) data as input', function() {
    assert.deepEqual(service.process(INPUT_DATA_FIRMWARE_F2),
                     EXPECTED_DATA_FIRMWARE_F2);
  });

  // Test the process function with valid temperatures data
  it('should handle valid temperatures data as input', function() {
    assert.deepEqual(service.process(INPUT_DATA_TEMPERATURES),
                     EXPECTED_DATA_TEMPERATURES);
  });

  // Test the process function with valid encrypted data
  it('should handle valid encrypted data as input', function() {
    assert.deepEqual(service.process(INPUT_DATA_ENCRYPTED),
                     EXPECTED_DATA_ENCRYPTED);
  });

});
