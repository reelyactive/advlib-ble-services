/**
 * Copyright reelyActive 2026
 * We believe in an open Internet of Things
 */


const utils = require('./utils');


const MIN_DATA_LENGTH_BYTES = 2;
const DEVICE_INFORMATION_OFFSET = 0;
const FIRST_DATA_TYPE_OFFSET = 1;
const VOC_UGM3_PER_PPM = 4.5;     // This is a simplification
const BTHOME_URI = "https://sniffypedia.org/Service/BTHome/";


/**
 * Process BTHome service data.
 * @param {Object} data The raw service data as a hexadecimal-string or Buffer.
 * @return {Object} The processed Minew data as JSON.
 */
function process(data) {
  let buf = utils.convertToBuffer(data);
  if((buf === null) || (buf.length < MIN_DATA_LENGTH_BYTES)) {
    return null;
  }

  let deviceInformation = buf.readUInt8(DEVICE_INFORMATION_OFFSET);
  let isVersion2 = ((deviceInformation & 0xe0) === 0x40);
  let isTriggerBased = ((deviceInformation & 0x04) === 0x04);
  let isEncrypted = ((deviceInformation & 0x01) === 0x01);
  let processedData = { uri: BTHOME_URI };

  if(isVersion2 && !isEncrypted) {
    let dataTypeOffset = FIRST_DATA_TYPE_OFFSET;
    let isAnotherDataType = true;

    while(isAnotherDataType) {
      let dataType = buf.readUInt8(dataTypeOffset);
      let dataValue = buf.subarray(dataTypeOffset + 1);
      let dataLength = processDataType(dataType, dataValue, processedData);

      dataTypeOffset += dataLength + 1;
      if((dataLength < 0) || (dataTypeOffset >= buf.length)) {
        isAnotherDataType = false;
      }
    }

    return processedData;
  }

  // TODO: handle encrypted data

  return null;
}


/**
 * Process a BTHome data type.
 * @param {Number} type The data type.
 * @param {Buffer} data The raw data as a Buffer.
 * @param {Object} processedData The processed data to which to append.
 * @return {Number} The length of the data in bytes.
 */
function processDataType(type, data, processedData) {
  switch(type) {
    case 0x00: // packet id
      if(data.length < 1) return -1;
      processedData.txCycle = data.readUInt8();
      return 1;
    case 0x01: // battery
      if(data.length < 1) return -1;
      processedData.batteryPercentage = data.readUInt8();
      return 1;
    case 0x02: // temperature
      if(data.length < 2) return -1;
      processedData.temperature = data.readInt16LE() / 100;
      return 2;
    case 0x03: // humidity
      if(data.length < 2) return -1;
      processedData.relativeHumidity = data.readUInt16LE() / 100;
      return 2;
    case 0x04: // pressure
      if(data.length < 3) return -1;
      processedData.pressure = data.readUIntLE(0, 3);
      return 3;
    case 0x05: // illuminance
      if(data.length < 3) return -1;
      processedData.illuminance = data.readUIntLE(0, 3) / 100;
      return 3;
    case 0x06: // mass
      if(data.length < 2) return -1;
      // TODO: add mass property
      return 2;
    case 0x07: // mass
      if(data.length < 2) return -1;
      // TODO: add mass property
      return 2;
    case 0x08: // dewpoint
      if(data.length < 2) return -1;
      // TODO: add dewpoint property
      return 2;
    case 0x09: // count
      if(data.length < 1) return -1;
      processedData.count = data.readUInt8();
      return 1;
    case 0x0a: // energy
      if(data.length < 3) return -1;
      // TODO: energy property (kWh)?
      return 3;
    case 0x0b: // power
      if(data.length < 3) return -1;
      processedData.power = data.readUIntLE(0, 3) / 100;
      return 3;
    case 0x0c: // voltage
      if(data.length < 2) return -1;
      processedData.voltage = data.readUInt16LE() / 1000;
      return 2;
    case 0x0d: // pm2.5
      if(data.length < 2) return -1;
      processedData['pm2.5'] = data.readUInt16LE();
      return 2;
    case 0x0e: // pm10
      if(data.length < 2) return -1;
      processedData['pm10'] = data.readUInt16LE();
      return 2;
    case 0x0f: // generic boolean
      if(data.length < 1) return -1;
      // TODO: add isCondition property?
      return 1;
    case 0x10: // power
      if(data.length < 1) return -1;
      // TODO: add isPoweredOn property?
      return 1;
    case 0x11: // opening
      if(data.length < 1) return -1;
      processedData.isContactDetected = [ (data.readUInt8() === 0) ];
      return 1;
    case 0x12: // co2
      if(data.length < 2) return -1;
      processedData.carbonDioxideConcentration = data.readUInt16LE();
      return 2;
    case 0x13: // tvoc
      if(data.length < 2) return -1;
      processedData.volatileOrganicCompoundsConcentration =
                            Math.round(data.readUInt16LE() / VOC_UGM3_PER_PPM);
      return 2;
    case 0x14: // moisture
      if(data.length < 2) return -1;
      // TODO: add property?
      return 2;
    case 0x15: // battery
      if(data.length < 1) return -1;
      // TODO: add isBatteryLow property?
      return 1;
    case 0x16: // battery charging
      if(data.length < 1) return -1;
      // TODO: add isBatteryCharging property?
      return 1;
    case 0x17: // carbon monoxide
      if(data.length < 1) return -1;
      // TODO: add isCarbonMonoxideDetected property?
      return 1;
    case 0x18: // cold
      if(data.length < 1) return -1;
      // TODO: add property?
      return 1;
    case 0x19: // connectivity
      if(data.length < 1) return -1;
      // TODO: add property?
      return 1;
    case 0x1a: // door
      if(data.length < 1) return -1;
      processedData.isContactDetected = [ (data.readUInt8() === 0) ];
      return 1;
    case 0x1b: // garage door
      if(data.length < 1) return -1;
      processedData.isContactDetected = [ (data.readUInt8() === 0) ];
      return 1;
    case 0x1c: // gas
      if(data.length < 1) return -1;
      processedData.isGasDetected = [ (data.readUInt8() > 0) ];
      return 1;
    case 0x1d: // heat
      if(data.length < 1) return -1;
      // TODO: add property?
      return 1;
    case 0x1e: // light
      if(data.length < 1) return -1;
      // TODO: add property?
      return 1;
    case 0x1f: // lock
      if(data.length < 1) return -1;
      // TODO: add property?
      return 1;
    case 0x20: // moisture
      if(data.length < 1) return -1;
      processedData.isLiquidDetected = [ (data.readUInt8() > 0) ];
      return 1;
    case 0x21: // motion
      if(data.length < 1) return -1;
      processedData.isMotionDetected = [ (data.readUInt8() > 0) ];
      return 1;
    case 0x22: // moving
      if(data.length < 1) return -1;
      processedData.isMotionDetected = [ (data.readUInt8() > 0) ];
      return 1;
    case 0x23: // occupancy
      if(data.length < 1) return -1;
      processedData.isOccupancyDetected = [ (data.readUInt8() > 0) ];
      return 1;
    case 0x24: // plug
      if(data.length < 1) return -1;
      // TODO: add property?
      return 1;
    case 0x25: // presence
      if(data.length < 1) return -1;
      processedData.isOccupancyDetected = [ (data.readUInt8() > 0) ];
      return 1;
    case 0x26: // problem
      if(data.length < 1) return -1;
      processedData.isHealthy = (data.readUInt8() === 0);
      return 1;
    case 0x27: // running
      if(data.length < 1) return -1;
      // TODO: add property?
      return 1;
    case 0x28: // safety
      if(data.length < 1) return -1;
      // TODO: add property?
      return 1;
    case 0x29: // smoke
      if(data.length < 1) return -1;
      // TODO: add property?
      return 1;
    case 0x2a: // sound
      if(data.length < 1) return -1;
      // TODO: add property?
      return 1;
    case 0x2b: // tamper
      if(data.length < 1) return -1;
      // TODO: add property?
      return 1;
    case 0x2c: // vibration
      if(data.length < 1) return -1;
      processedData.isMotionDetected = [ (data.readUInt8() > 0) ];
      return 1;
    case 0x2d: // window
      if(data.length < 1) return -1;
      processedData.isContactDetected = [ (data.readUInt8() === 0) ];
      return 1;
    case 0x2e: // humidity
      if(data.length < 1) return -1;
      processedData.relativeHumidity = data.readUInt8();
      return 1;
    case 0x2f: // moisture
      if(data.length < 1) return -1;
      // TODO: add property?
      return 1;
    case 0x3a: // button
      if(data.length < 1) return -1;
      let eventId = data.readUInt8();
      processedData.isButtonPressed = [ (eventId === 0x01), (eventId === 0x02),
                                        (eventId === 0x03), (eventId === 0x04),
                                        (eventId === 0x05), (eventId === 0x06),
                                        (eventId === 0x80) ];
      return 1;
    case 0x3c: // dimmer
      if(data.length < 2) return -1;
      // TODO: add property?
      return 2;
    case 0x3d: // count
      if(data.length < 2) return -1;
      processedData.count = data.readUInt16LE();
      return 2;
    case 0x3e: // count
      if(data.length < 4) return -1;
      processedData.count = data.readUInt32LE();
      return 4;
    case 0x3f: // rotation
      if(data.length < 2) return -1;
      processedData.angleOfRotation = data.readInt16LE() / 10;
      return 2;
    case 0x40: // distance
      if(data.length < 2) return -1;
      processedData.distance = data.readUInt16LE() / 1000;
      return 2;
    case 0x41: // distance
      if(data.length < 2) return -1;
      processedData.distance = data.readUInt16LE() / 10;
      return 2;
    case 0x42: // duration
      if(data.length < 3) return -1;
      processedData.duration = data.readUIntLE(0, 3) / 1000;
      return 3;
    case 0x43: // current
      if(data.length < 2) return -1;
      processedData.amperage = data.readUInt16LE() / 1000;
      return 2;
    case 0x44: // speed
      if(data.length < 2) return -1;
      processedData.speed = data.readUInt16LE() / 100;
      return 2;
    case 0x45: // temperature
      if(data.length < 2) return -1;
      processedData.temperature = data.readInt16LE() / 10;
      return 2;
    case 0x46: // UV index
      if(data.length < 1) return -1;
      // TODO: add property?
      return 1;
    case 0x47: // volume
      if(data.length < 2) return -1;
      // TODO: add property?
      return 2;
    case 0x48: // volume
      if(data.length < 2) return -1;
      // TODO: add property?
      return 2;
    case 0x49: // volume flow rate
      if(data.length < 2) return -1;
      // TODO: add property?
      return 2;
    case 0x4a: // voltage
      if(data.length < 2) return -1;
      processedData.voltage = data.readUInt16LE() / 10;
      return 2;
    case 0x4b: // gas
      if(data.length < 3) return -1;
      // TODO: add property?
      return 3;
    case 0x4c: // gas
      if(data.length < 4) return -1;
      // TODO: add property?
      return 4;
    case 0x4d: // energy
      if(data.length < 4) return -1;
      // TODO: energy property (kWh)?
      return 4;
    case 0x4e: // volume
      if(data.length < 4) return -1;
      // TODO: add property?
      return 4;
    case 0x4f: // waters
      if(data.length < 4) return -1;
      // TODO: add property?
      return 4;
    case 0x50: // timestamp
      if(data.length < 4) return -1;
      // TODO: add property?
      return 4;
    case 0x51: // acceleration
      if(data.length < 2) return -1;
      processedData.acceleration = [ data.readUInt16LE() / 9806.65 ];
      return 2;
    case 0x52: // gyroscope
      if(data.length < 2) return -1;
      processedData.angularVelocity = data.readUInt16LE() / 1000;
      return 2;
    case 0x53: // text
      if(data.length < 1) return -1;
      let stringLength = data.readUInt8();
      // TODO: add property?
      if(data.length < stringLength + 1) return -1;
      return stringLength + 1;
    case 0x54: // raw
      if(data.length < 1) return -1;
      let rawLength = data.readUInt8();
      // TODO: add property?
      if(data.length < rawLength + 1) return -1;
      return rawLength + 1;
    case 0x55: // volume storage
      if(data.length < 4) return -1;
      // TODO: add property?
      return 4;
    case 0x56: // conductivity
      if(data.length < 2) return -1;
      // TODO: add property?
      return 2;
    case 0x57: // temperature
      if(data.length < 1) return -1;
      processedData.temperature = data.readInt8();
      return 1;
    case 0x58: // temperature
      if(data.length < 1) return -1;
      processedData.temperature = data.readInt8() * 0.35;
      return 1;
    case 0x59: // count
      if(data.length < 1) return -1;
      processedData.count = data.readInt8();
      return 1;
    case 0x5a: // count
      if(data.length < 2) return -1;
      processedData.count = data.readInt16LE();
      return 2;
    case 0x5b: // count
      if(data.length < 4) return -1;
      processedData.count = data.readInt32LE();
      return 4;
    case 0x5c: // power
      if(data.length < 4) return -1;
      processedData.power = data.readInt32LE() / 100;
      return 4;
    case 0x5d: // current
      if(data.length < 2) return -1;
      processedData.amperage = data.readInt16LE() / 1000;
      return 2;
    case 0x5e: // direction
      if(data.length < 2) return -1;
      processedData.heading = data.readUInt16LE() / 100;
      return 2;
    case 0x5f: // precipitation
      if(data.length < 2) return -1;
      // TODO: add property?
      return 2;
    case 0x60: // channel
      if(data.length < 1) return -1;
      // TODO: add property?
      return 1;
    case 0x61: // rotational speed
      if(data.length < 2) return -1;
      processedData.angularVelocity = data.readUInt16LE() * 6;
      return 2;
    case 0x62: // speed
      if(data.length < 4) return -1;
      processedData.speed = data.readInt32LE() / 1000000;
      return 4;
    case 0x63: // acceleration
      if(data.length < 4) return -1;
      processedData.acceleration = [ data.readInt32LE() / 1000000 ];
      return 4;
    case 0xf0: // device type id
      if(data.length < 2) return -1;
      // TODO: add property?
      return 2;
    case 0xf1: // firmware version
      if(data.length < 4) return -1;
      // TODO: add property?
      return 4;
    case 0xf2: // firmware version
      if(data.length < 3) return -1;
      // TODO: add property?
      return 3;
    default:
      return -1;
  }
}


module.exports.process = process;
