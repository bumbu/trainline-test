import Moment from 'moment'
import { operatorCodeToText, stationCodeToText } from '../../../utils/codes'

export const mapServicesState = (state) => {
  return state.map((item) => {
    let platform = getPlatform(item)
    let destination = getDestinationName(item)
    let { expected, notOnTime } = getExpectedTime(item)

    return {
      destination: stationCodeToText(destination),
      due: timeStringToHuman(item.scheduledInfo.scheduledTime),
      expected,
      notOnTime,
      key: item.serviceIdentifier,
      operator: operatorCodeToText(item.serviceOperator),
      platform,
      routeUrl: item.callingPatternUrl,
    }
  })
}

/**
 * Get platform if it is available
 * null otherwise
 *
 * @param  {object} item
 * @return {string|null}
 */
function getPlatform(item) {
  let platform = null
  if (item.realTimeUpdatesInfo && item.realTimeUpdatesInfo.realTimeServiceInfo &&
      item.realTimeUpdatesInfo.realTimeServiceInfo.realTimePlatform
    ) {
    platform = item.realTimeUpdatesInfo.realTimeServiceInfo.realTimePlatform
  }
  return platform
}

/**
 * Get destination name
 *
 * @param  {object} item
 * @return {string}
 */
function getDestinationName(item) {
  let destination = 'unknown'
  if (item.destinationList && item.destinationList.length && item.destinationList[0].crs) {
    destination = item.destinationList[0].crs
  }
  return stationCodeToText(destination)
}

/**
 * Get expected time and if the train is not on time
 *
 * @param  {object} item
 * @return {{expected: string|null, notOnTime: boolean}}
 */
function getExpectedTime(item) {
  let expected = null
  let notOnTime = false
  if (item.realTimeUpdatesInfo &&
      item.realTimeUpdatesInfo.realTimeServiceInfo &&
      item.realTimeUpdatesInfo.realTimeServiceInfo.realTime &&
      item.realTimeUpdatesInfo.realTimeServiceInfo.realTime !== item.scheduledInfo.scheduledTime
    ) {
    expected = timeStringToHuman(item.realTimeUpdatesInfo.realTimeServiceInfo.realTime)
    notOnTime = true
  }

  return {expected, notOnTime}
}

function timeStringToHuman (str) {
  return Moment(str).format('HH:mm')
}
