/**
 * Copyright reelyActive 2015-2021
 * We believe in an open Internet of Things
 */


const eddystone = require('./eddystone');
const exposurenotification = require('./exposurenotification');
const gatt = require('./gatt');
const minew = require('./minew');
const utils = require('./utils');


const MIN_DATA_LENGTH_BYTES = 1;


/**
 * Process Bluetooth Low Energy advertising service data.
 * @param {String} uuid The UUID as a hexadecimal string.
 * @param {Object} data The raw service data as a hexadecimal-string or Buffer.
 * @return {Object} The processed service data as JSON.
 */
function processServiceData(uuid, data) {
  let buf = utils.convertToBuffer(data);
  uuid = utils.convertToUUID(uuid);

  if((uuid === null) || (buf === null) || (buf.length < MIN_DATA_LENGTH_BYTES)) {
    return null;
  }

  switch(uuid) {
    case '2a37':
      return gatt.process(data, uuid);
    case '2a67':
      return gatt.process(data, uuid);
    case '2a6c':
      return gatt.process(data, uuid);
    case '2a6e':
      return gatt.process(data, uuid);
    case '2aa1':
      return gatt.process(data, uuid);
    case 'ffe1':
      return minew.process(data);
    case 'feaa':
      return eddystone.process(data);
    case 'fd6f':
      return exposurenotification.process(data);
  }

  return null;
}


module.exports.processServiceData = processServiceData;