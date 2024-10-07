/**
 * Copyright reelyActive 2015-2024
 * We believe in an open Internet of Things
 */


const eddystone = require('./eddystone');
const exposurenotification = require('./exposurenotification');
const gatt = require('./gatt');
const hewlettpackardenterprise = require('./hewlettpackardenterprise');
const minew = require('./minew');
const utils = require('./utils');
const wiliot = require('./wiliot');


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
    case '2a19':
    case '2a37':
    case '2a67':
    case '2a6c':
    case '2a6d':
    case '2a6e':
    case '2a6f':
    case '2aa1':
    case '2aa2':
    case '2aee':
    case '2af9':
    case '2afb':
    case '2b8c':
    case '2bcf':
    case '2bd0':
    case '2bd1':
    case '2bd2':
    case '2be7':
      return gatt.process(data, uuid);
    case 'ffe1':
      return minew.process(data);
    case 'feaa':
      return eddystone.process(data);
    case 'fdaf':
      return wiliot.process(data);
    case 'fd94':
      return hewlettpackardenterprise.process(data);
    case 'fd6f':
      return exposurenotification.process(data);
  }

  return null;
}


module.exports.processServiceData = processServiceData;
