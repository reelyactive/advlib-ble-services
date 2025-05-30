advlib-ble-services
===================

Wireless advertising packet decoding library for Bluetooth Low Energy service data.  __advlib-ble-services__ is typically used as a library for [advlib-ble](https://github.com/reelyactive/advlib-ble) which itself is commonly a processor module of the protocol-agnostic [advlib](https://github.com/reelyactive/advlib).

![Overview of advlib-ble-services](https://reelyactive.github.io/advlib-ble-services/images/overview.png)

__advlib-ble-services__ is a lightweight [Node.js package](https://www.npmjs.com/package/advlib-ble-services) with no dependencies.   It is included in reelyActive's [Pareto Anywhere](https://www.reelyactive.com/pareto/anywhere/) open source IoT middleware.  See also its sister library [advlib-ble-manufacturers](https://github.com/reelyactive/advlib-ble-manufacturers).


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

| Service UUID | Service Name                  | /lib file                   |
|:-------------|:------------------------------|:----------------------------|
| 0x2a07       | Tx Power Level                | gatt.js                     |
| 0x2a19       | Battery Level                 | gatt.js                     |
| 0x2a37       | Heart Rate Measurement        | gatt.js                     |
| 0x2a67       | Location and Speed            | gatt.js                     |
| 0x2a6c       | Elevation                     | gatt.js                     |
| 0x2a6d       | Pressure                      | gatt.js                     |
| 0x2a6e       | Temperature                   | gatt.js                     |
| 0x2a6f       | Humidity                      | gatt.js                     |
| 0x2aa1       | Magnetic flux density 3D      | gatt.js                     |
| 0x2aa2       | Language                      | gatt.js                     |
| 0x2aee       | Electric Current              | gatt.js                     |
| 0x2af9       | Generic Level                 | gatt.js                     |
| 0x2afb       | Illuminance                   | gatt.js                     |
| 0x2b18       | Voltage                       | gatt.js                     |
| 0x2b8c       | CO2 Concentration             | gatt.js                     |
| 0x2bcf       | Ammonia Concentration         | gatt.js                     |
| 0x2bd0       | Carbon Monoxide Concentration | gatt.js                     |
| 0x2bd1       | Methane Concentration         | gatt.js                     |
| 0x2bd2       | NO2 Concentration             | gatt.js                     |
| 0x2be4       | Noise                         | gatt.js                     |
| 0x2be7       | VOC Concentration             | gatt.js                     |
| 0xfd6f       | Exposure Notification         | exposurenotification.js     |
| 0xfd9f       | Hewlett Packard Enterprise    | hewlettpackardenterprise.js |
| 0xfdaf       | Wiliot                        | wiliot.js                   |
| 0xfeaa       | Eddystone (Google)            | eddystone.js                |
| 0xffe1       | Minew BeaconPlus              | minew.js                    |

Consult the [Bluetooth Assigned Numbers](https://www.bluetooth.com/specifications/assigned-numbers/) page for the most recent 16-bit UUIDs document.


Supported Devices
-----------------

The following is a _non-exhaustive_ list of devices supported by __advlib-ble-services__.

| Manufacturer | Model/Device             | /lib file                |
|:-------------|:-------------------------|:-------------------------|
| Various      | Heart rate monitor       | gatt.js                  |
| Various      | Eddystone beacon         | eddystone.js             |
| Various      | Android phone (contact tracing) | exposurenotification.js  |
| Apple        | iPhone (contact tracing) | exposurenotification.js  |
| Wiliot       | Pixel                    | wiliot.js                |
| Minew        | E8S ([Tutorial](https://reelyactive.github.io/diy/minew-e8-config/)) | minew.js |
| Minew        | S1 ([Tutorial](https://reelyactive.github.io/diy/minew-s1-config/)) | minew.js |
| Minew        | B10 ([Tutorial](https://reelyactive.github.io/diy/minew-b10-config/)) | minew.js |
| Minew        | MSP01 ([Tutorial](https://reelyactive.github.io/diy/minew-msp01-config/)) | minew.js |
| Minew        | MSV01                    | minew.js                 |
| Minew        | MBT01                    | minew.js                 |
| Minew        | MSL01                    | minew.js                 |
| Minew        | MSA01                    | minew.js                 |
| Arduino      | Nicla Vision ([Tutorial](https://reelyactive.github.io/diy/nicla-vision-dev/)) | gatt.js |


Supported Minew BeaconPlus Frames
---------------------------------

The following BeaconPlus frames (UUID: 0xffe1, Frame type: 0xa1), in order of their version number, are supported by __advlib-ble-services__.

| Number | Frame           | Properties                                          |
|:-------|:----------------|:--------------------------------------------------|
| 0x01   | HT              | batteryPercentage, temperature, relativeHumidity  |
| 0x02   | Visible Light   | batteryPercentage, isContactDetected              |
| 0x03   | ACC-Axis        | acceleration, batteryPercentage                   |
| 0x05   | Light lux       | batteryPercentage, illuminance                    |
| 0x07   | DFU             |                                                   |
| 0x08   | Device Info     | batteryPercentage, name                           |
| 0x11   | PIR             | batteryPercentage, isMotionDetected               |
| 0x12   | TVOC            | batteryPercentage, volatileOrganicCompoundsConcentration |
| 0x13   | Temperature     | batteryPercentage, temperature                    |
| 0x15   | ACC & GYRO      | acceleration, angularVelocity, batteryPercentage  |
| 0x16   | Magnetometer    | batteryPercentage, magneticField                  |
| 0x17   | Pressure        | batteryPercentage, pressure                       |
| 0x18   | Vibration       | batteryPercentage, isMotionDetected               |
| 0x19   | Photoresistance | batteryPercentage, luminousFlux                   |
| 0x20   | Tamper          | batteryPercentage, isContactDetected              |
| 0x21   | Leak Detection  | batteryPercentage, isLiquidDetected               |

See the [reelyActive Developer's Cheatsheet](https://reelyactive.github.io/diy/cheatsheet/) for more details about the standard properties above which are considered to be dynamic ambient (dynamb) data.


Contributing
------------

Discover [how to contribute](CONTRIBUTING.md) to this open source project which upholds a standard [code of conduct](CODE_OF_CONDUCT.md).


Security
--------

Consult our [security policy](SECURITY.md) for best practices using this open source software and to report vulnerabilities.


License
-------

MIT License

Copyright (c) 2015-2025 [reelyActive](https://www.reelyactive.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE 
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, 
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN 
THE SOFTWARE.
