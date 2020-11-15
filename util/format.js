const format = (data) => {
  return data
    .toString()
    .split(".")
    .map((val, i) => (i === 1 ? val.substring(0, 2) : val))
    .join(".");
};

const prettier = (sensorData) => {
  const { temperature, humidity, pressure, lastUpdated } = sensorData;

  return `<strong>Temperature:</strong>  ${format(temperature)} C
    \n<strong>Humidity:</strong>  %${format(humidity)}
    \n<strong>Pressure:</strong> ${format(pressure)} hPa
    \n<strong>Last updated at:</strong> ${format(lastUpdated)}`;
};

export { prettier, format };
