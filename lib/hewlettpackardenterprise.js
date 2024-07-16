/**
 * Copyright reelyActive 2024
 * We believe in an open Internet of Things
 */


const utils = require('./utils');


const MIN_DATA_LENGTH_BYTES = 2;
const SUBTYPE_OFFSET = 0;
const SEQ_FRAG_OFFSET = 1;
const FIRST_LOCATION_ELEMENT_OFFSET = 2;
const SEQ_MASK = 0xf0;
const FRAG_MASK = 0x0e;
const LAST_FRAG_MASK = 0x01;
const TAG_MASK = 0xe0;
const LENGTH_MASK = 0x1f;
const SEQ_SHIFT = 4;
const FRAG_SHIFT = 1;
const TAG_SHIFT = 5;
const PROPERTIES_ELEMENT_MIN_LENGTH_BYTES = 2;
const GEOLOCATION_ELEMENT_LENGTH_BYTES = 16;
const FLOOR_LOCATION_ELEMENT_MIN_LENGTH_BYTES = 9;
const IDENTITY_ELEMENT_MIN_LENGTH_BYTES = 2;
const URL_ELEMENT_MIN_LENGTH_BYTES = 3;
const SIGNATURE_ELEMENT_MIN_LENGTH_BYTES = 2;
const DATUM_WGS84 = 1;
const ID_TYPE_MAC_ADDRESS_MASK = 0x01;
const ID_TYPE_TEXT_STRING_MASK = 0x02;
const ID_TYPE_IBEACON_ID_MASK = 0x04;
const HPE_URI = "https://sniffypedia.org/Organization/Hewlett_Packard_Enterprise_Company/";


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

  let subtype = buf.readUInt8(SUBTYPE_OFFSET);

  switch(subtype) {
    case 0x09:
      return processOpenLocate(buf);
  }

  return null;
}


/**
 * Process Open Locate service data.
 * @param {Object} data The raw service data as a Buffer.
 * @return {Object} The processed Open Locate data as JSON.
 */
function processOpenLocate(data) {
  let processedData = {};
  let sequenceNumber = data.readUInt8(SEQ_FRAG_OFFSET) & SEQ_MASK >> SEQ_SHIFT;
  let fragmentNumber = data.readUInt8(SEQ_FRAG_OFFSET) & FRAG_MASK >>
                                                                    FRAG_SHIFT;
  let isLastFragment = (data.readUInt8(SEQ_FRAG_OFFSET) & LAST_FRAG_MASK) ===
                                                                LAST_FRAG_MASK;
  let locationElementIndex = FIRST_LOCATION_ELEMENT_OFFSET;

  while(locationElementIndex < data.length) {
    let processedElement;
    let tag = (data.readUInt8(locationElementIndex) & TAG_MASK) >> TAG_SHIFT;
    let length = data.readUInt8(locationElementIndex) & LENGTH_MASK;

    if((length === 0) || ((locationElementIndex + length) >= data.length)) {
      return processedData;
    }

    let element = data.subarray(locationElementIndex + 1,
                                locationElementIndex + 1 + length);

    switch(tag) {
      case 0:
        processedElement = processProperties(element);
        break;
      case 1:
        processedElement = processGeoLocation(element);
        break;
      case 2:
        processedElement = processFloorLocation(element);
        break;
      case 3:
        processedElement = processIdentity(element);
        break;
      case 4:
        processedElement = processUrl(element);
        break;
      case 5:
        processedElement = processSignature(element);
        break;
    }

    if(processedElement) {
      Object.assign(processedData, processedElement);
    }

    locationElementIndex += 1 + length;
  }

  processedData.uri = processedData.uri || HPE_URI;  
  return processedData;
}


/**
 * Process a Properties Location Element.
 * @param {Buffer} element The Location Element as a Buffer.
 * @return {Object} The processed Location Element data as JSON.
 */
function processProperties(element) {
  if(element.length < PROPERTIES_ELEMENT_MIN_LENGTH_BYTES) {
    return null;
  }

  let txPower = element.readInt8(0);
  let isStationary = (element.readUInt8(1) & 0x01) === 0x00;

  return { txPower: txPower, isStationary: isStationary };
}


/**
 * Process a Geo Location Location Element.
 * @param {Buffer} element The Location Element as a Buffer.
 * @return {Object} The processed Location Element data as JSON.
 */
function processGeoLocation(element) {
  if(element.length !== GEOLOCATION_ELEMENT_LENGTH_BYTES) {
    return null;
  }

  let version = element.readUInt8(15) >> 6;
  let datum = element.readUInt8(15) & 0x07;

  if((version !== 1) || (datum !== DATUM_WGS84)) {
    return null;
  }

  let latitudeWhole = (element.readUInt16BE(0) >> 1) & 0x1ff;
  let latitudeFraction = element.readUInt32BE(1) & 0x1ffffff;
  let longitudeWhole = (element.readUInt32BE(4) >> 9) & 0x1ff;
  let longitudeFraction = element.readUInt32BE(6) & 0x1ffffff;
  let altitude = element.readUInt32BE(11) & 0x3fffffff;

  // TODO: convert to position

  return {};
}


/**
 * Process a Floor Location Location Element.
 * @param {Buffer} element The Location Element as a Buffer.
 * @return {Object} The processed Location Element data as JSON.
 */
function processFloorLocation(element) {
  if(element.length < FLOOR_LOCATION_ELEMENT_MIN_LENGTH_BYTES) {
    return null;
  }

  // TODO: x/y uncertainty

  let x = (element.readUInt32BE(0) & 0xffffff) / 100;
  let y = (element.readUInt32BE(4) & 0xffffff) / 100;
  let floorId = element.toString('utf-8', 8);

  return { position: [ x, y ], floorId: floorId };
}


/**
 * Process an Identity Location Element.
 * @param {Buffer} element The Location Element as a Buffer.
 * @return {Object} The processed Location Element data as JSON.
 */
function processIdentity(element) {
  if(element.length < IDENTITY_ELEMENT_MIN_LENGTH_BYTES) {
    return null;
  }

  let idTypes = element.readUInt8();
  let identityOffset = 1;
  let processedIdentity = {};

  if(idTypes & ID_TYPE_MAC_ADDRESS_MASK) {
    if((identityOffset + 6) > element.length) {
      return processedIdentity;
    }
    let mac = element.toString('hex', identityOffset, identityOffset + 6);
    processedIdentity.deviceIds = [ mac + '/2'  ];
    identityOffset += 6;
  }
  if(idTypes & ID_TYPE_TEXT_STRING_MASK) {
    let stringLength = element.readUInt8(identityOffset);
    if((identityOffset + stringLength + 1) > element.length) {
      return processedIdentity;
    }
    processedIdentity.name = element.toString('utf-8', identityOffset + 1,
                                            identityOffset + 1 + stringLength);
    identityOffset += stringLength + 1;
  }
  if(idTypes & ID_TYPE_IBEACON_ID_MASK) {
    if((identityOffset + 20) > element.length) {
      return processedIdentity;
    }
    let uuid = element.toString('hex', identityOffset, identityOffset + 16);
    let major = element.toString('hex', identityOffset + 16,
                                        identityOffset + 18);
    let minor = element.toString('hex', identityOffset + 18,
                                        identityOffset + 20);
    if(!Array.isArray(processedIdentity.deviceIds)) {
      processedIdentity.deviceIds = [];
    }
    processedIdentity.deviceIds.push(uuid + '/' + major + '/' + minor);
  }

  return processedIdentity;
}


/**
 * Process a URL Location Element.
 * @param {Buffer} element The Location Element as a Buffer.
 * @return {Object} The processed Location Element data as JSON.
 */
function processUrl(element) {
  if(element.length < URL_ELEMENT_MIN_LENGTH_BYTES) {
    return null;
  }

  let schemePrefix = element.readUInt8();
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

  for(let index = 1; index < element.length; index++) {
    let char = convertToUrlChar(element.readUInt8(index));
    if(char === null) {
      return null;
    }
    url += char;
  }

  return { uri: url };
}


/**
 * Process a Signature Location Element.
 * @param {Buffer} element The Location Element as a Buffer.
 * @return {Object} The processed Location Element data as JSON.
 */
function processSignature(element) {
  if(element.length < SIGNATURE_ELEMENT_MIN_LENGTH_BYTES) {
    return null;
  }

  let sigType = element.readUInt8();

  switch(sigType) {
    case 0:
      if(element.length !== 21) {
        return null;
      }
      let timestamp = element.readUInt32BE(1);
      let mac = element.toString('hex', 5);
      return { signature: { timestamp: timestamp,
                            messageAuthenticationCode: mac } };
  }

  return null;
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
