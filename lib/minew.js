/**
 * Copyright reelyActive 2015-2022
 * We believe in an open Internet of Things
 */


const utils = require('./utils');


const MIN_DATA_LENGTH_BYTES = 2;
const MINEW_FRAME_TYPE = 0xa1;
const TEMPERATURE_HUMIDITY_FRAME_LENGTH = 13;
const VISIBLE_LIGHT_FRAME_LENGTH = 10;
const ACCELERATION_FRAME_LENGTH = 15;
const PIR_FRAME_LENGTH = 11;
const VIBRATION_FRAME_LENGTH = 14;
const MIN_INFO_FRAME_LENGTH = 9;
const FRAME_TYPE_OFFSET = 0;
const PRODUCT_MODEL_OFFSET = 1;
const BATTERY_PERCENTAGE_OFFSET = 2;
const TEMPERATURE_OFFSET = 3;
const HUMIDITY_OFFSET = 5;
const VISIBLE_LIGHT_OFFSET = 3;
const ACC_X_OFFSET = 3;
const ACC_Y_OFFSET = 5;
const ACC_Z_OFFSET = 7;
const NAME_OFFSET = 9;
const PIR_OFFSET = 3;
const TIMESTAMP_OFFSET = 3;
const VIBRATION_OFFSET = 7;
const PIR_MASK = 0x0001;
const VISIBLE_LIGHT_MASK = 0x01;
const VIBRATION_MASK = 0x01;
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

  let productModel = buf.readUInt8(PRODUCT_MODEL_OFFSET);

  switch(productModel) {
    case 0x01:
      return processTemperatureHumidity(buf);
    case 0x02:
      return processVisibleLight(buf);
    case 0x03:
      return processAcceleration(buf);
    case 0x08:
      return processInfo(buf);
    case 0x11:
      return processPassiveInfrared(buf);
    case 0x18:
      return processVibration(buf);
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

  // TODO: Include timestamp?  Units?
  return { batteryPercentage: batteryPercentage,
           isVibration: isVibration, uri: MINEW_URI };
}


module.exports.process = process;
