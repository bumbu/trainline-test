import Moment from 'moment'
import { stationCodeToText, operatorCodeToText } from '../../../utils/codes'

export const mapRouteState = (state) => {
  let trainFound = false
  let prevItem = null
  let counter = 0

  const stops = state.stops.map((item) => {
    const isOrigin = item.arrival.notApplicable ? true : false
    const isDestination = item.departure.notApplicable ? true : false
    const hasDeparted = item.departure.realTime ? item.departure.realTime.realTimeServiceInfo.hasDeparted : false
    const hasArrived = item.arrival.realTime ? item.arrival.realTime.realTimeServiceInfo.hasArrived : false

    // Checks where the train is
    // If train still not found, and we find a station where the
    // train didn't arive yet, then it means that it's still on
    // previous station section
    let isTrainHere = false
    if (trainFound === false) {
      if ((isOrigin && !hasDeparted) || (isDestination && hasArrived)) {
        trainFound = true
        isTrainHere = true
      } else if (prevItem && !hasArrived) {
        trainFound = true
        prevItem.isTrainHere = true
      }
    }

    prevItem = {
      status: getItemStatus(item),
      hasDeparted,
      isDestination,
      isOrigin,
      isTrainHere,
      scheduledAt: timeStringToHuman(!isDestination
        ? item.departure.scheduled.scheduledTime
        : item.arrival.scheduled.scheduledTime
      ),
      station: stationCodeToText(item.location.crs),
      key: counter++,
    }

    return prevItem
  })

  return {
    stops,
    origin: stationCodeToText(state.serviceOrigins.length && state.serviceOrigins[0]),
    destination: stationCodeToText(state.serviceDestinations.length && state.serviceDestinations[0]),
    operator: operatorCodeToText(state.serviceOperator),
  }
}

/**
 * Forrmats items status in a human-readadle form
 *
 * @param  {object} item
 * @return {string}
 */
function getItemStatus (item) {
  let status = 'On time'

  if (ifDepartedNotOnSchedule(item)) {
    let timeStr = timeStringToHuman(item.departure.realTime.realTimeServiceInfo.realTime)
    status = `Dept. ${timeStr}`
  } else if (ifExpectedNotOnSchedule(item)) {
    let timeStr = timeStringToHuman(item.arrival.realTime.realTimeServiceInfo.realTime)
    status = `Exp. at ${timeStr}`
  } else if (ifDelayed(item)) {
    status = `Delayed`
  }

  return status
}

/**
 * If it departed not on scheduled time
 *
 * @param  {object} item
 * @return {boolean}
 */
function ifDepartedNotOnSchedule (item) {
  return item.departure.realTime &&
    item.departure.scheduled &&
    item.departure.realTime.realTimeServiceInfo.realTime &&
    item.departure.realTime.realTimeServiceInfo.realTime !== item.departure.scheduled.scheduledTime
}

/**
 * If it is expected at a different time than scheduled
 *
 * @param  {object} item
 * @return {boolean}
 */
function ifExpectedNotOnSchedule (item) {
  return item.arrival.realTime &&
    item.arrival.scheduled &&
    item.arrival.realTime.realTimeServiceInfo.realTime &&
    item.arrival.realTime.realTimeServiceInfo.realTime !== item.arrival.scheduled.scheduledTime
}

/**
 * If it is/was delayed
 *
 * @param  {object} item
 * @return {boolean}
 */
function ifDelayed (item) {
  return (item.departure.realTime && item.departure.realTime.delayReason) ||
    (item.arrival.realTime && item.arrival.realTime.delayReason)
}

function timeStringToHuman (str) {
  return Moment(str).format('HH:mm')
}
