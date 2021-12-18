advlib-ble-services
===================

Wireless advertising packet decoding library for Bluetooth Low Energy service data.  __advlib-ble-services__ is typically used as a library for [advlib-ble](https://github.com/reelyactive/advlib-ble) which itself is commonly a processor module of the protocol-agnostic [advlib](https://github.com/reelyactive/advlib).

__advlib-ble-services__ is a lightweight [Node.js package](https://www.npmjs.com/package/advlib-ble-services) with no dependencies.  See also its sister library [advlib-ble-manufacturers](https://github.com/reelyactive/advlib-ble-manufacturers).


Installation
------------

    npm install advlib-ble-services


Hello advlib-ble-services!
--------------------------

```javascript
const advlib = require('advlib-ble-services');

let uuid = 'feaa';
let serviceData = '10000367657470617265746f07';

let processedData = advlib.processServiceData(uuid, serviceData);

console.log(processedData);
```

Which should yield the following console output:

    { txPower: 0, uri: "https://getpareto.com" }


Supported Services
------------------

The following services, in order of their assigned UUIDs, are supported by __advlib-ble-services__.

| Service UUID | Service Name             | /lib file                |
|:-------------|:-------------------------|:-------------------------|
| 0x2a37       | Heart Rate Measurement   | gatt.js                  |
| 0x2a67       | Location and Speed       | gatt.js                  |
| 0x2a6c       | Elevation                | gatt.js                  |
| 0x2a6d       | Pressure                 | gatt.js                  |
| 0x2a6e       | Temperature              | gatt.js                  |
| 0x2aa1       | Magnetic flux density 3D | gatt.js                  |
| 0x2afb       | Illuminance              | gatt.js                  |
| 0xfd6f       | Exposure Notification    | exposurenotification.js  |
| 0xfeaa       | Eddystone (Google)       | eddystone.js             |
| 0xffe1       | Minew                    | minew.js                 |

Consult the [Bluetooth Assigned Numbers](https://www.bluetooth.com/specifications/assigned-numbers/) page for the most recent 16-bit UUIDs document.



License
-------

MIT License

Copyright (c) 2015-2021 [reelyActive](https://www.reelyactive.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE 
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, 
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN 
THE SOFTWARE.
