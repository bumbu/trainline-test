import Moment from 'moment'

const operatorCodes = {
  SW: 'South West Trains'
}

const locationCodes = {
  PMH: 'Porstsmouth Harbour',
  DKG: 'Dorking',
  GLD: 'Guildford',
}

export const mapServicesState = (state) => {
  return state.map((item) =>{
    let platform = null
    if (item.realTimeUpdatesInfo && item.realTimeUpdatesInfo.realTimeServiceInfo && item.realTimeUpdatesInfo.realTimeServiceInfo.realTimePlatform) {
      platform = item.realTimeUpdatesInfo.realTimeServiceInfo.realTimePlatform
    }
    let destination = 'unknown'
    if (item.destinationList && item.destinationList.length && item.destinationList[0].crs) {
      destination = item.destinationList[0].crs
    }
    let expected = null
    let notOnTime = false
    if (item.realTimeUpdatesInfo && item.realTimeUpdatesInfo.realTimeServiceInfo
        && item.realTimeUpdatesInfo.realTimeServiceInfo.realTime && item.realTimeUpdatesInfo.realTimeServiceInfo.realTime != item.scheduledInfo.scheduledTime) {
      expected = timeStringToHuman(item.realTimeUpdatesInfo.realTimeServiceInfo.realTime)
      notOnTime = true
    }

    return {
      destination: codeToText(destination, locationCodes),
      due: timeStringToHuman(item.scheduledInfo.scheduledTime),
      expected,
      notOnTime,
      key: item.serviceIdentifier,
      operator: codeToText(item.serviceOperator, operatorCodes),
      platform,
      routeUrl: item.callingPatternUrl,
    }
  })
}

function codeToText(code, codes) {
  if (code in codes) {
    return codes[code]
  } else {
    return code
  }
}

function timeStringToHuman(str) {
  return Moment(str).format('HH:mm')
}
