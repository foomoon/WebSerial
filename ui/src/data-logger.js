
function parseData(msg) {
  let correctNumberOfFields = 28;
  if (msg.length > 25) {
    let fields = msg.split(",");
    if (fields.length == correctNumberOfFields) {
      return {
        utc: fields[0],
        met: fields[1] / 1000,    // sec
        lat: fields[2] / 10000000, // deg
        lng: fields[3] / 10000000, // deg
        alt: fields[4] / 1000,    // m
        speed: fields[5] / 1000,  // m/s
        heading: fields[6] / 100000, // deg
        siv: fields[7]*1 + 0,
        pressureRaw: getRawPressures(fields),
        temperatureRaw: getRawTemperatures(fields),
        heightRaw: getRawHeights(fields)
      }
    } else {
      console.warn("Incorrect number of fields! Found " + fields.length + ", expected: " + correctNumberOfFields);
      return {}
    }
  } else {
    console.warn("Message not formatted correctly or too short")
    return {}
  }
}

function getRawData(fields,start,stop,interval) {
  let result = [];
  for (let i=start; i<=stop; i=i+interval) {
    result.push(fields[i]*1 + 0);
  }
  return "[" + result.toString() + "]";
}

function getRawPressures(fields) {
  return getRawData(fields,8,8+15,2);
}
function getRawTemperatures(fields) {
  return getRawData(fields,9,9+15,2);
}
function getRawHeights(fields) {
  return getRawData(fields,8+16,8+16+3,1);
}

export default parseData