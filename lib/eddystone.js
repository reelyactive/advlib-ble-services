/**
 * Copyright reelyActive 2015-2020
 * We believe in an open Internet of Things
 */


const utils = require('./utils');


const MIN_DATA_LENGTH_BYTES = 4;
const MIN_EDDYSTONE_URL_FRAME_LENGTH = 4;
const EDDYSTONE_UID_FRAME_LENGTH = 20;
const EDDYSTONE_TLM_FRAME_LENGTH = 14;
const TX_POWER_OFFSET = 1;
const NAMESPACE_OFFSET = 2;
const INSTANCE_OFFSET = 12;
const SCHEME_PREFIX_OFFSET = 2;
const URL_OFFSET = 3;
const VERSION_OFFSET = 1;
const BATTERY_OFFSET = 2;
const TEMPERATURE_OFFSET = 4;
const ADV_CNT_OFFSET = 6;
const SEC_CNT_OFFSET = 10;
const NAMESPACE_LENGTH = 10;
const INSTANCE_LENGTH = 6;


/**
 * Process Eddystone service data.
 * @param {Object} data The raw service data as a hexadecimal-string or Buffer.
 * @return {Object} The processed Eddystone data as JSON.
 */
function process(data) {
  let buf = utils.convertToBuffer(data);
  if((buf === null) || (buf.length < MIN_DATA_LENGTH_BYTES)) {
    return null;
  }

  let frameType = buf.readUInt8();
  switch(frameType) {
    case 0x00:
      return processEddystoneUID(buf);
    case 0x10:
      return processEddystoneURL(buf);
    case 0x20:
      return processEddystoneTLM(buf);
  }

  return null;
}


/**
 * Process Eddystone-UID service data.
 * @param {Object} data The raw service data as a Buffer.
 * @return {Object} The processed Eddystone-UID data as JSON.
 */
function processEddystoneUID(data) {
  let isInvalidLength = (data.length !== EDDYSTONE_UID_FRAME_LENGTH);
  if(isInvalidLength) {
    return null;
  }

  let txPower = data.readInt8(TX_POWER_OFFSET);
  let namespace = data.toString('hex', NAMESPACE_OFFSET,
                                NAMESPACE_OFFSET + NAMESPACE_LENGTH);
  let instance = data.toString('hex', INSTANCE_OFFSET,
                                INSTANCE_OFFSET + INSTANCE_LENGTH);

  return { txPower: txPower, namespace: namespace, instance: instance };
}


/**
 * Process Eddystone-URL service data.
 * @param {Object} data The raw service data as a Buffer.
 * @return {Object} The processed Eddystone-URL data as JSON.
 */
function processEddystoneURL(data) {
  let isInvalidLength = (data.length < MIN_EDDYSTONE_URL_FRAME_LENGTH);
  if(isInvalidLength) {
    return null;
  }

  let txPower = data.readInt8(TX_POWER_OFFSET);
  let schemePrefix = data.readUInt8(SCHEME_PREFIX_OFFSET);
  let url;

  switch(schemePrefix) {
    case 0x00:
      url = 'http://www.';
      break;
    case 0x01:
      url = 'https://www.';
      break;
    case 0x02:
      url = 'http://';
      break;
    case 0x03:
      url = 'https://';
      break;
    default:
      return null;
  }

  for(let index = URL_OFFSET; index < data.length; index++) {
    let char = convertToUrlChar(data.readUInt8(index));
    if(char === null) {
      return null;
    }
    url += char;
  }

  return { txPower: txPower, url: url };
}


/**
 * Process Eddystone-TLM service data.
 * @param {Object} data The raw service data as a Buffer.
 * @return {Object} The processed Eddystone-TLM data as JSON.
 */
function processEddystoneTLM(data) {
  let isInvalidLength = (data.length !== EDDYSTONE_TLM_FRAME_LENGTH);
  if(isInvalidLength) {
    return null;
  }

  let version = data.readUInt8(VERSION_OFFSET);
  let isInvalidVersion = (version !== 0x00);
  if(isInvalidVersion) {
    return null;
  }

  let batteryVoltage = data.readUInt16BE(BATTERY_OFFSET) / 1000;
  let temperature = data.readInt16BE(TEMPERATURE_OFFSET) / 256;
  let transmissionCount = data.readUInt32BE(ADV_CNT_OFFSET);
  let uptime = data.readUInt32BE(SEC_CNT_OFFSET) * 100;

  return { batteryVoltage: batteryVoltage,
           temperature: temperature,
           transmissionCount: transmissionCount,
           uptime: uptime };
}


/**
 * Convert the given byte code to a character.
 * @param {Number} code The code as an (unsigned) integer.
 * @return {String} The character.
 */
function convertToUrlChar(code) {
  let isInvalideCode = (((code >= 14) && (code <= 32)) || (code >= 127));
  if(isInvalideCode) {
    return null;
  }

  switch(code) {
    case 0x00:
      return '.com/';
    case 0x01:
      return '.org/';
    case 0x02:
      return '.edu/';
    case 0x03:
      return '.net/';
    case 0x04:
      return '.info/';
    case 0x05:
      return '.biz/';
    case 0x06:
      return '.gov/';
    case 0x07:
      return '.com';
    case 0x08:
      return '.org';
    case 0x09:
      return '.edu';
    case 0x0a:
      return '.net';
    case 0x0b:
      return '.info';
    case 0x0c:
      return '.biz';
    case 0x0d:
      return '.gov';
    default:
      return String.fromCharCode(code);
  }
}


module.exports.process = process;