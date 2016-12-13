import Moment from 'moment'
import { locationCodeToText, operatorCodeToText } from '../../../utils/codes'

export const mapRouteState = (state) => {
  let trainFound = false
  let prevItem = null

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

    let status = 'On time'
    if (item.departure.realTime && item.departure.realTime.realTimeServiceInfo.realTime !== item.departure.scheduled.scheduledTime) {
      let timeStr = timeStringToHuman(item.departure.realTime.realTimeServiceInfo.realTime)
      status = `Dept. ${timeStr}`
    } else if (item.arrival.realTime && item.arrival.realTime.realTimeServiceInfo.realTime !== item.arrival.scheduled.scheduledTime) {
      let timeStr = timeStringToHuman(item.arrival.realTime.realTimeServiceInfo.realTime)
      status = `Exp. at ${timeStr}`
    }

    prevItem = {
      status: status,
      hasDeparted,
      isDestination,
      isOrigin,
      isTrainHere,
      scheduledAt: timeStringToHuman(!isDestination ? item.departure.scheduled.scheduledTime : item.arrival.scheduled.scheduledTime),
      station: locationCodeToText(item.location.crs),
    }

    return prevItem
  })

  return {
    stops,
    origin: locationCodeToText(state.serviceOrigins.length && state.serviceOrigins[0]),
    destination: locationCodeToText(state.serviceDestinations.length && state.serviceDestinations[0]),
    operator: operatorCodeToText(state.serviceOperator),
  }
}

function timeStringToHuman(str) {
  return Moment(str).format('HH:mm')
}
