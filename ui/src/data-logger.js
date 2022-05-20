
function parseData(msg) {

  // expect whole lines but could be multiple lines
  let lines = msg.split("\n");
  // initialize output array
  let output = [];
  // expect 28 fields per line
  let correctNumberOfFields = 28;

  // loop through each line found
  for (let i = 0; i < lines.length-1; i++) {

    msg = lines[i].trim();
    let lineNum = i + 1;
    let totalLines = lines.length -1;
    console.log("LINE " + lineNum + "/" + totalLines + " " + msg)

    // check if line is legit long enough to be interesting
    if (msg.length > 25) {
      // split each line into fields
      let fields = msg.split(",");
      // if correct number of fields
      if (fields.length == correctNumberOfFields) {
        output.push ({
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
        })
      } else {
        console.warn("Incorrect number of fields! Found " + fields.length + ", expected: " + correctNumberOfFields);
      }
    } else {
      console.warn("Message not formatted correctly or too short")
      //console.log(msg)
    }

  } // end for

  return output
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