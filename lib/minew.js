/**
 * Copyright reelyActive 2015-2025
 * We believe in an open Internet of Things
 */


const utils = require('./utils');


const MIN_DATA_LENGTH_BYTES = 2;
const MINEW_FRAME_TYPE = 0xa1;
const TEMPERATURE_HUMIDITY_FRAME_LENGTH = 13;
const VISIBLE_LIGHT_FRAME_LENGTH = 10;
const ACCELERATION_FRAME_LENGTH = 15;
const ILLUMINANCE_FRAME_LENGTH = 11;
const DFU_FRAME_LENGTH = 8;
const PIR_FRAME_LENGTH = 11;
const TVOC_FRAME_LENGTH = 11;
const TEMPERATURE_FRAME_LENGTH = 11;
const ACC_GYRO_FRAME_LENGTH = 20;
const MAGNETIC_FIELD_FRAME_LENGTH = 15;
const PHOTORESISTANCE_FRAME_LENGTH = 11;
const TAMPER_FRAME_LENGTH = 10;
const WATER_DETECTION_FRAME_LENGTH = 10;
const VIBRATION_FRAME_LENGTH = 14;
const MIN_INFO_FRAME_LENGTH = 9;
const FRAME_TYPE_OFFSET = 0;
const VERSION_NUMBER_OFFSET = 1;
const BATTERY_PERCENTAGE_OFFSET = 2;
const TEMPERATURE_OFFSET = 3;
const HUMIDITY_OFFSET = 5;
const VISIBLE_LIGHT_OFFSET = 3;
const ACC_X_OFFSET = 3;
const ACC_Y_OFFSET = 5;
const ACC_Z_OFFSET = 7;
const ILLUMINANCE_OFFSET = 3;
const NAME_OFFSET = 9;
const PIR_OFFSET = 3;
const TVOC_OFFSET = 3;
const MAG_X_OFFSET = 3;
const MAG_Y_OFFSET = 5;
const MAG_Z_OFFSET = 7;
const TIMESTAMP_OFFSET = 3;
const AG_ACC_X_OFFSET = 2;
const AG_ACC_Y_OFFSET = 4;
const AG_ACC_Z_OFFSET = 6;
const AG_GYR_X_OFFSET = 8;
const AG_GYR_Y_OFFSET = 10;
const AG_GYR_Z_OFFSET = 12;
const VIBRATION_OFFSET = 7;
const PHOTORESISTANCE_OFFSET = 3;
const TAMPER_OFFSET = 3;
const WATER_DETECTION_OFFSET = 3;
const PIR_MASK = 0x0001;
const VISIBLE_LIGHT_MASK = 0x01;
const VIBRATION_MASK = 0x01;
const TAMPER_MASK = 0x01;
const WATER_DETECTION_MASK = 0x01;
const MINEW_URI = "https://sniffypedia.org/Organization/Shenzhen_Minew_Technologies_Co_Ltd/";


/**
 * Process Minew service data.
 * @param {Object} data The raw service data as a hexadecimal-string or Buffer.
 * @return {Object} The processed Minew data as JSON.
 */
function process(data) {
  let buf = utils.convertToBuffer(data);
  if((buf === null) || (buf.length < MIN_DATA_LENGTH_BYTES)) {
    return null;
  }

  let frameType = buf.readUInt8(FRAME_TYPE_OFFSET);
  if(frameType !== MINEW_FRAME_TYPE) {
    return null;
  }

  let versionNumber = buf.readUInt8(VERSION_NUMBER_OFFSET);

  switch(versionNumber) {
    case 0x01:
      return processTemperatureHumidity(buf);
    case 0x02:
      return processVisibleLight(buf);
    case 0x03:
      return processAcceleration(buf);
    case 0x05:
      return processIlluminance(buf);
    case 0x07:
      return processDeviceFirmwareUpdate(buf);
    case 0x08:
      return processInfo(buf);
    case 0x11:
      return processPassiveInfrared(buf);
    case 0x12:
      return processVolatileOrganicCompoundsConcentration(buf);
    case 0x13:
      return processTemperature(buf);
    case 0x15:
      return processAccelerationGyroscope(buf);
    case 0x16:
      return processMagneticField(buf);
    case 0x18:
      return processVibration(buf);
    case 0x19:
      return processPhotoresistance(buf);
    case 0x20:
      return processTamper(buf);
    case 0x21:
      return processWaterDetection(buf);
  }

  return null;
}


/**
 * Process temperature and humidity service data.
 * @param {Object} data The raw service data as a Buffer.
 * @return {Object} The processed temperature and humidity data as JSON.
 */
function processTemperatureHumidity(data) {
  let isInvalidLength = (data.length !== TEMPERATURE_HUMIDITY_FRAME_LENGTH);
  if(isInvalidLength) {
    return null;
  }

  let batteryPercentage = data.readUInt8(BATTERY_PERCENTAGE_OFFSET);
  let temperature = utils.parseSigned88(data.subarray(TEMPERATURE_OFFSET,
                                                      TEMPERATURE_OFFSET + 2));
  let relativeHumidity = utils.parseSigned88(data.subarray(HUMIDITY_OFFSET,
                                                         HUMIDITY_OFFSET + 2));

  return { batteryPercentage: batteryPercentage, temperature: temperature,
           relativeHumidity: relativeHumidity, uri: MINEW_URI };
}


/**
 * Process visible light service data.
 * @param {Object} data The raw service data as a Buffer.
 * @return {Object} The processed visible light data as JSON.
 */
function processVisibleLight(data) {
  let isInvalidLength = (data.length !== VISIBLE_LIGHT_FRAME_LENGTH);
  if(isInvalidLength) {
    return null;
  }

  let batteryPercentage = data.readUInt8(BATTERY_PERCENTAGE_OFFSET);
  let isVisibleLight = ((data.readUInt8(VISIBLE_LIGHT_OFFSET) &
                         VISIBLE_LIGHT_MASK) === VISIBLE_LIGHT_MASK);

  return { batteryPercentage: batteryPercentage,
           isContactDetected: [ !isVisibleLight ], uri: MINEW_URI };
}


/**
 * Process acceleration service data.
 * @param {Object} data The raw service data as a Buffer.
 * @return {Object} The processed acceleration data as JSON.
 */
function processAcceleration(data) {
  let isInvalidLength = (data.length !== ACCELERATION_FRAME_LENGTH);
  if(isInvalidLength) {
    return null;
  }

  let batteryPercentage = data.readUInt8(BATTERY_PERCENTAGE_OFFSET);
  let acceleration = [
      utils.parseSigned88(data.subarray(ACC_X_OFFSET, ACC_X_OFFSET + 2)),
      utils.parseSigned88(data.subarray(ACC_Y_OFFSET, ACC_Y_OFFSET + 2)),
      utils.parseSigned88(data.subarray(ACC_Z_OFFSET, ACC_Z_OFFSET + 2))
  ];

  return { batteryPercentage: batteryPercentage, acceleration: acceleration,
           uri: MINEW_URI };
}


/**
 * Process illuminance service data.
 * @param {Object} data The raw service data as a Buffer.
 * @return {Object} The processed illuminance data as JSON.
 */
function processIlluminance(data) {
  let isInvalidLength = (data.length !== ILLUMINANCE_FRAME_LENGTH);
  if(isInvalidLength) {
    return null;
  }

  let batteryPercentage = data.readUInt8(BATTERY_PERCENTAGE_OFFSET);
  let illuminance = data.readUInt16BE(ILLUMINANCE_OFFSET);

  return { batteryPercentage: batteryPercentage, illuminance: illuminance,
           uri: MINEW_URI };
}


/**
 * Process DFU service data.
 * @param {Object} data The raw service data as a Buffer.
 * @return {Object} The processed DFU data as JSON.
 */
function processDeviceFirmwareUpdate(data) {
  let isInvalidLength = (data.length !== DFU_FRAME_LENGTH);
  if(isInvalidLength) {
    return null;
  }

  return { uri: MINEW_URI };
}


/**
 * Process info service data.
 * @param {Object} data The raw service data as a Buffer.
 * @return {Object} The processed info data as JSON.
 */
function processInfo(data) {
  let isInvalidLength = (data.length < MIN_INFO_FRAME_LENGTH);
  if(isInvalidLength) {
    return null;
  }

  let batteryPercentage = data.readUInt8(BATTERY_PERCENTAGE_OFFSET);
  let name = data.toString('utf8', NAME_OFFSET);

  return { batteryPercentage: batteryPercentage, name: name, uri: MINEW_URI };
}


/**
 * Process passive infrared (PIR) service data.
 * @param {Object} data The raw service data as a Buffer.
 * @return {Object} The processed infrared data as JSON.
 */
function processPassiveInfrared(data) {
  let isInvalidLength = (data.length !== PIR_FRAME_LENGTH);
  if(isInvalidLength) {
    return null;
  }

  let batteryPercentage = data.readUInt8(BATTERY_PERCENTAGE_OFFSET);
  let isInfraredDetected = ((data.readUInt16BE(PIR_OFFSET) & PIR_MASK) ===
                            PIR_MASK);

  return { batteryPercentage: batteryPercentage,
           isMotionDetected: [ isInfraredDetected ], uri: MINEW_URI };
}


/**
 * Process TVOC service data.
 * @param {Object} data The raw service data as a Buffer.
 * @return {Object} The processed VOC concentration data as JSON.
 */
function processVolatileOrganicCompoundsConcentration(data) {
  let isInvalidLength = (data.length !== TVOC_FRAME_LENGTH);
  if(isInvalidLength) {
    return null;
  }

  let batteryPercentage = data.readUInt8(BATTERY_PERCENTAGE_OFFSET);
  let volatileOrganicCompoundsConcentration = data.readUInt16BE(TVOC_OFFSET) /
                                              1000;

  return { batteryPercentage: batteryPercentage, uri: MINEW_URI,
           volatileOrganicCompoundsConcentration:
                                        volatileOrganicCompoundsConcentration };
}


/**
 * Process temperature service data.
 * @param {Object} data The raw service data as a Buffer.
 * @return {Object} The processed temperature data as JSON.
 */
function processTemperature(data) {
  let isInvalidLength = (data.length !== TEMPERATURE_FRAME_LENGTH);
  if(isInvalidLength) {
    return null;
  }

  let batteryPercentage = data.readUInt8(BATTERY_PERCENTAGE_OFFSET);
  let temperature = utils.parseSigned88(data.subarray(TEMPERATURE_OFFSET,
                                                      TEMPERATURE_OFFSET + 2));

  return { batteryPercentage: batteryPercentage, temperature: temperature,
           uri: MINEW_URI };
}


/**
 * Process acceleration and gyroscope service data.
 * @param {Object} data The raw service data as a Buffer.
 * @return {Object} The processed acceleration and gyroscope data as JSON.
 */
function processAccelerationGyroscope(data) {
  let isInvalidLength = (data.length !== ACC_GYRO_FRAME_LENGTH);
  if(isInvalidLength) {
    return null;
  }

  let acceleration = [
      utils.parseSigned88(data.subarray(AG_ACC_X_OFFSET, AG_ACC_X_OFFSET + 2)),
      utils.parseSigned88(data.subarray(AG_ACC_Y_OFFSET, AG_ACC_Y_OFFSET + 2)),
      utils.parseSigned88(data.subarray(AG_ACC_Z_OFFSET, AG_ACC_Z_OFFSET + 2))
  ];
  let angularVelocity = [
      data.readInt16BE(AG_GYR_X_OFFSET) / 100,
      data.readInt16BE(AG_GYR_Y_OFFSET) / 100,
      data.readInt16BE(AG_GYR_Z_OFFSET) / 100
  ];

  return { acceleration: acceleration, angularVelocity: angularVelocity,
           uri: MINEW_URI };
}


/**
 * Process magnetic field service data.
 * @param {Object} data The raw service data as a Buffer.
 * @return {Object} The processed magnetic field data as JSON.
 */
function processMagneticField(data) {
  let isInvalidLength = (data.length !== MAGNETIC_FIELD_FRAME_LENGTH);
  if(isInvalidLength) {
    return null;
  }

  let batteryPercentage = data.readUInt8(BATTERY_PERCENTAGE_OFFSET);
  let magneticField = [ // TODO: confirm units are indeed in 10mG
      utils.parseSigned88(data.subarray(MAG_X_OFFSET, MAG_X_OFFSET + 2)) / 100,
      utils.parseSigned88(data.subarray(MAG_Y_OFFSET, MAG_Y_OFFSET + 2)) / 100,
      utils.parseSigned88(data.subarray(MAG_Z_OFFSET, MAG_Z_OFFSET + 2)) / 100
  ];

  return { batteryPercentage: batteryPercentage, magneticField: magneticField,
           uri: MINEW_URI };
}


/**
 * Process vibration service data.
 * @param {Object} data The raw service data as a Buffer.
 * @return {Object} The processed vibration data as JSON.
 */
function processVibration(data) {
  let isInvalidLength = (data.length !== VIBRATION_FRAME_LENGTH);
  if(isInvalidLength) {
    return null;
  }

  let batteryPercentage = data.readUInt8(BATTERY_PERCENTAGE_OFFSET);
  let timestamp = data.readUInt32BE(TIMESTAMP_OFFSET);
  let isVibration = ((data.readUInt8(VIBRATION_OFFSET) & VIBRATION_MASK) ===
                     VIBRATION_MASK);

  // TODO: Include timestamp?
  return { batteryPercentage: batteryPercentage,
           isMotionDetected: [ isVibration ], uri: MINEW_URI };
}


/**
 * Process photoresistance service data.
 * @param {Object} data The raw service data as a Buffer.
 * @return {Object} The processed photoresistance data as JSON.
 */
function processPhotoresistance(data) {
  let isInvalidLength = (data.length !== PHOTORESISTANCE_FRAME_LENGTH);
  if(isInvalidLength) {
    return null;
  }

  let batteryPercentage = data.readUInt8(BATTERY_PERCENTAGE_OFFSET);
  let luminousFlux = data.readUInt16BE(PHOTORESISTANCE_OFFSET);

  return { batteryPercentage: batteryPercentage, luminousFlux: luminousFlux,
           uri: MINEW_URI };
}


/**
 * Process tamper service data.
 * @param {Object} data The raw service data as a Buffer.
 * @return {Object} The processed tamper data as JSON.
 */
function processTamper(data) {
  let isInvalidLength = (data.length !== TAMPER_FRAME_LENGTH);
  if(isInvalidLength) {
    return null;
  }

  let batteryPercentage = data.readUInt8(BATTERY_PERCENTAGE_OFFSET);
  let isTamper = ((data.readUInt8(TAMPER_OFFSET) & TAMPER_MASK) ===
                  TAMPER_MASK);

  return { batteryPercentage: batteryPercentage,
           isContactDetected: [ !isTamper ], uri: MINEW_URI };
}


/**
 * Process water (leak) detection service data.
 * @param {Object} data The raw service data as a Buffer.
 * @return {Object} The processed tamper data as JSON.
 */
function processWaterDetection(data) {
  let isInvalidLength = (data.length !== WATER_DETECTION_FRAME_LENGTH);
  if(isInvalidLength) {
    return null;
  }

  let batteryPercentage = data.readUInt8(BATTERY_PERCENTAGE_OFFSET);
  let isLiquidDetected = ((data.readUInt8(WATER_DETECTION_OFFSET) &
                                WATER_DETECTION_MASK) === WATER_DETECTION_MASK);

  return { batteryPercentage: batteryPercentage,
           isLiquidDetected: [ isLiquidDetected ], uri: MINEW_URI };
}


module.exports.process = process;
