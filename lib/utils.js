/**
 * Copyright reelyActive 2015-2023
 * We believe in an open Internet of Things
 */


const SIGNATURE_SEPARATOR = '/';


/**
 * Convert the given hexadecimal string or Buffer to a Buffer.
 * @param {Object} data A hexadecimal-string or Buffer.
 * @return {Object} The data as a Buffer, or null if invalid data format.
 */
function convertToBuffer(data) {
  if(Buffer.isBuffer(data)) {
    return data;
  }

  if(typeof data === 'string') {
    data = data.toLowerCase();
    let isHex = /[0-9a-f]+/.test(data);
    if(isHex) {
      return Buffer.from(data, 'hex');
    }
  }

  return null;
}


/**
 * Convert the given UUID to a a hexadecimal string representation.
 * @param {Object} data A hexadecimal-string or Buffer.
 * @return {Object} The data as a Buffer, or null if invalid data format.
 */
function convertToUUID(data) {
  if(Buffer.isBuffer(data)) {
    return data.toString('hex');
  }

  if(typeof data === 'string') {
    data = data.toLowerCase();
    let isHex = /[0-9a-f]+/.test(data);
    if(isHex) {
      return data;
    }
  }

  return null;
}


/**
 * Convert the given data to a hexadecimal string of the given number of bytes.
 * @param {Object} data The data to convert (Number, String or Buffer).
 * @param {Number} length The target length of the string in bytes.
 * @param {boolean} reverseEndianness Optionally reverse the endianness.
 * @return {String} The data as a hexadecimal string.
 */
function convertToHexString(data, length, reverseEndianness) {
  let hexString = null;

  if(Number.isInteger(data) && (data >= 0)) {
    hexString = data.toString(16).padStart(length * 2, '0');
  }
  if(Buffer.isBuffer(data)) {
    hexString = data.toString('hex').padStart(length * 2, '0');
  }
  if(typeof data === 'string') {
    hexString = data.padStart(length * 2, '0');
  }

  if(hexString && (reverseEndianness === true)) {
    return hexString.match(/.{2}/g).reverse().join('');
  }

  return hexString;
}


/**
 * Convert the given signed 8.8 Buffer to a floating point Number.
 * @param {Object} data The signed 8.8 Bufferdata to convert.
 * @return {Number} The floating point representation as a Number.
 */
function parseSigned88(data) {
  return data.readInt8() + (data.readUInt8(1) / 256);
}


/**
 * Convert the given medfloat16 Buffer to a floating point Number.
 * @param {Buffer} data The medfloat16 Buffer data to convert.
 * @return {Number} The floating point representation as a Number.
 */
function parseMedfloat16(data) {
  let value = data.readUInt16LE();

  switch(value) {
    case 0x07ff:
      return Number.NaN;
    case 0x07fe:
      return Number.POSITIVE_INFINITY;
    case 0x0802:
      return Number.NEGATIVE_INFINITY;
    case 0x0801:
    case 0x0800:
      return null;
  }

  let mantissa = value & 0x0fff;
  let exponent = value >> 12;

  if(mantissa >= 0x0800) {
    mantissa = mantissa - 0x1000;
  }
  if(exponent >= 0x8) {
    exponent = exponent - 0x10;
  }

  return mantissa * Math.pow(10, exponent);
}


/**
 * Convert the given medfloat32 Buffer to a floating point Number.
 * @param {Buffer} data The medfloat32 Buffer data to convert.
 * @return {Number} The floating point representation as a Number.
 */
function parseMedfloat32(data) {
  let value = data.readUInt32LE();

  switch(value) {
    case 0x007fffff:
      return Number.NaN;
    case 0x007ffffe:
      return Number.POSITIVE_INFINITY;
    case 0x00800002:
      return Number.NEGATIVE_INFINITY;
    case 0x00800001:
    case 0x00800000:
      return null;
  }

  let mantissa = value & 0x00ffffff;
  let exponent = value >> 24;

  if(mantissa >= 0x00800000) {
    mantissa = mantissa - 0x1000000;
  }
  if(exponent >= 0x80) {
    exponent = exponent - 0x100;
  }
  
  return mantissa * Math.pow(10, exponent);
}


/**
 * Convert the given RFC6335 geocoordinate to a floating point Number.
 * @param {Number} integer The 9-bit integer portion.
 * @param {Number} fraction The 25-bit fraction portion.
 * @return {Number} The floating point representation as a Number.
 */
function parseRfc6225Geocoordinate(integer, fraction) {
  let isNegative = (integer & 0x100);

  if(isNegative) {
    integer = integer - 0x1ff;
    fraction = fraction - 0x1ffffff;
  }

  return integer + (fraction / 0x1ffffff);
}


/**
 * Convert the given RFC6335 altitude to a floating point Number.
 * @param {Number} integer The 30-bit altitude representation.
 * @param {Number} type The altitude type code.
 * @return {Number} The floating point representation as a Number.
 */
function parseRfc6225Altitude(altitude, altitudeType) {
  let isMetres = (altitudeType === 0x01);
  let isFloor = (altitudeType === 0x02);

  if(!isMetres && !isFloor) {
    return null;
  }

  let integer = (altitude >> 8);
  let fraction = (altitude & 0xff);
  let isNegative = (integer & 0x200000);

  if(isNegative) {
    integer = integer - 0x3fffff;
    fraction = fraction - 0xff;
  }

  return integer + (fraction / 0xff);
}


module.exports.SIGNATURE_SEPARATOR = SIGNATURE_SEPARATOR;
module.exports.convertToBuffer = convertToBuffer;
module.exports.convertToUUID = convertToUUID;
module.exports.convertToHexString = convertToHexString;
module.exports.parseSigned88 = parseSigned88;
module.exports.parseMedfloat16 = parseMedfloat16;
module.exports.parseMedfloat32 = parseMedfloat32;
module.exports.parseRfc6225Geocoordinate = parseRfc6225Geocoordinate;
module.exports.parseRfc6225Altitude = parseRfc6225Altitude;