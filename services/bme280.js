const bme280 = require("bme280");

let sensorData = null;

function readSensorData() {
  bme280
    .open()
    .then(async (sensor) => {
      sensorData = await sensor.read();

      sensorData.lastUpdated = new Date().toLocaleString();

      console.log(sensorData);
      await sensor.close();
    })
    .catch(console.log);
}

export { sensorData, readSensorData };
