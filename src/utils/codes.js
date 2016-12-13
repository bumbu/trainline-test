const locationCodes = require('./station_codes.json')

const operatorCodes = {
  SW: 'South West Trains'
}

function codeToText(code, codes) {
  if (code in codes) {
    return codes[code]
  } else {
    return code
  }
}

export const operatorCodeToText = (code) => codeToText(code, operatorCodes)
export const stationCodeToText = (code) => codeToText(code, locationCodes)
