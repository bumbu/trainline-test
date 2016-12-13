const operatorCodes = {
  SW: 'South West Trains'
}

const locationCodes = {
  PMH: 'Porstsmouth Harbour',
  DKG: 'Dorking',
  GLD: 'Guildford',
  WAT: 'London Waterloo',
}

function codeToText(code, codes) {
  if (code in codes) {
    return codes[code]
  } else {
    return code
  }
}

export const operatorCodeToText = (code) => codeToText(code, operatorCodes)
export const locationCodeToText = (code) => codeToText(code, locationCodes)
