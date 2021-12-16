/**
 * Copyright reelyActive 2015-2021
 * We believe in an open Internet of Things
 */


const utils = require('./utils');


const MIN_DATA_LENGTH_BYTES = 1;

const HRM_MIN_STRUCT_LENGTH = 2;
const HRM_MAX_STRUCT_LENGTH = 21; // Assumes 8 RR-intervals (could be higher?)
const HRM_FLAGS_OFFSET = 0;
const HRM_VALUE_OFFSET = 1;
const HRM_RR_INTERVAL_SECONDS_DIVIDER = 1024;
const LAS_MIN_STRUCT_LENGTH = 2;
const LAS_MAX_STRUCT_LENGTH = 28;
const LAS_FLAGS_OFFSET = 0;
const LAS_FIELDS_OFFSET = 2;
const TEMPERATURE_STRUCT_LENGTH = 2;
const TEMPERATURE_MIN_VALUE = -273.15;


/**
 * Process GATT characteristic service data.
 * (based on Bluetooth GATT Specification Supplement)
 * @param {Object} data The raw service data as a hexadecimal-string or Buffer.
 * @param {String} uuid The 16-bit UUID as a hexadecimal string.
 * @return {Object} The processed GATT data as JSON.
 */
function process(data, uuid) {
  let buf = utils.convertToBuffer(data);
  if((buf === null) || (buf.length < MIN_DATA_LENGTH_BYTES)) {
    return null;
  }

  switch(uuid) {
    case '2a37':
      return processHeartRateMeasurement(buf);
    case '2a67':
      return processLocationAndSpeed(buf);
    case '2a6e':
      return processTemperature(buf);
  }

  return null;
}


/**
 * Process heart rate measurement data.
 * @param {Object} data The raw service data as a Buffer.
 * @return {Object} The processed heart rate measurement data as JSON.
 */
function processHeartRateMeasurement(data) {
  let isInvalidLength = (data.length < HRM_MIN_STRUCT_LENGTH) ||
                        (data.length > HRM_MAX_STRUCT_LENGTH);
  if(isInvalidLength) {
    return null;
  }

  let hrm = {};
  let flags = data.readUInt8(HRM_FLAGS_OFFSET);
  let offset = HRM_VALUE_OFFSET;

  if(flags & 0x01) { // Heart rate value format
    hrm.heartRate = data.readUInt16LE(offset);
    offset += 2;
  }
  else {
    hrm.heartRate = data.readUInt8(offset++);
  }

  if(flags & 0x04) { // Sensor contact supported
    if(flags & 0x02) { // Sensor contact detected
      hrm.isSensorContactDetected = true;
    }
    else {
      hrm.isSensorContactDetected = false;
    }
  }

  if(flags & 0x08) { // Energy expended present (unit = Joules)
    hrm.energyExpended = data.readUInt16LE(offset);
    offset += 2;
  }

  if(flags & 0x10) { // RR-intervals present (unit = seconds)
    hrm.rrIntervals = [];
    while(offset <= (data.length - 2)) {
      hrm.rrIntervals.push(data.readUInt16LE(offset) /
                           HRM_RR_INTERVAL_SECONDS_DIVIDER);
      offset += 2;
    }
  }

  return hrm;
}


/**
 * Process location and speed data.
 * @param {Object} data The raw service data as a Buffer.
 * @return {Object} The processed location and speed data as JSON.
 */
function processLocationAndSpeed(data) {
  let isInvalidLength = (data.length < LAS_MIN_STRUCT_LENGTH) ||
                        (data.length > LAS_MAX_STRUCT_LENGTH);
  if(isInvalidLength) {
    return null;
  }

  let las = {};
  let flags = data.readUInt16LE(LAS_FLAGS_OFFSET);
  let offset = LAS_FIELDS_OFFSET;

  if(flags & 0x0001) { // Instantaneous speed present
    las.speed = data.readUInt16LE(offset) / 100;
    offset += 2;
  }
  if(flags & 0x0002) { // Total distance present
console.log(data.toString('hex', offset));
    las.distance = data.readUIntLE(offset, 3) / 10;
    offset += 3;
  }
  if(flags & 0x0004) { // Location present
    las.latitude = data.readInt32LE(offset) / 10000000;
    offset += 4;
    las.longitude = data.readInt32LE(offset) / 10000000;
    offset += 4;
  }
  if(flags & 0x0008) { // Elevation present
    las.elevation = data.readIntLE(offset, 3) / 100;
    offset += 3;
  }
  if(flags & 0x0010) { // Heading present
    las.heading = data.readUInt16LE(offset) / 100;
    offset += 2;
  }
  if(flags & 0x0020) { // Rolling time present
    // TODO: interpret? data.readUInt8(offset);
    offset++;
  }
  if(flags & 0x0040) { // UTC time present
    // TODO: interpret as Date/Time characteristic when implemented
  }

  // TODO: interpret additional flags?

  return las;
}


/**
 * Process temperature data.
 * @param {Object} data The raw service data as a Buffer.
 * @return {Object} The processed temperature data as JSON.
 */
function processTemperature(data) {
  let isInvalidLength = (data.length !== TEMPERATURE_STRUCT_LENGTH);
  if(isInvalidLength) {
    return null;
  }

  let temperature = data.readInt16LE() / 100;

  if(temperature < TEMPERATURE_MIN_VALUE) {
    return null;
  }

  return { temperature: temperature };
}


module.exports.process = process;