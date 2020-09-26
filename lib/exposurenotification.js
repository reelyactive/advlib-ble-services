/**
 * Copyright reelyActive 2020
 * We believe in an open Internet of Things
 */


const utils = require('./utils');


const EXPOSURE_NOTIFICATION_LENGTH = 20;
const RPI_OFFSET = 0;
const VERSION_OFFSET = 16;
const TX_POWER_OFFSET = 17;
const RPI_LENGTH = 16;
const MAJOR_VERSION_MASK = 0xc0;
const MINOR_VERSION_MASK = 0x30;


/**
 * Process Apple/Google Exposure Notification service data.
 * @param {Object} data The raw service data as a hexadecimal-string or Buffer.
 * @return {Object} The processed Exposure Notification data as JSON.
 */
function process(data) {
  let buf = utils.convertToBuffer(data);
  if((buf === null) || (buf.length !== EXPOSURE_NOTIFICATION_LENGTH)) {
    return null;
  }

  let rollingProximityIdentifier = buf.toString('hex', RPI_OFFSET,
                                                RPI_OFFSET + RPI_LENGTH);
  let version = ((buf.readUInt8(VERSION_OFFSET) & MAJOR_VERSION_MASK) >> 6) +
                '.' +
                ((buf.readUInt8(VERSION_OFFSET) & MINOR_VERSION_MASK) >> 4);
  let txPower = buf.readInt8(TX_POWER_OFFSET);

  return { rollingProximityIdentifier: rollingProximityIdentifier,
           version: version, txPower: txPower };
}


module.exports.process = process;