/**
 * Copyright reelyActive 2015-2020
 * We believe in an open Internet of Things
 */


const eddystone = require('./eddystone');
const exposurenotification = require('./exposurenotification');
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
    case 'feaa':
      return eddystone.process(data);
    case 'fd6f':
      return exposurenotification.process(data);
  }

  return null;
}


module.exports.processServiceData = processServiceData;