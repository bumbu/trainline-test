import superagent from 'superagent'
import Moment from 'moment'
import { mapRouteState } from './utils'


// ------------------------------------
// Constants
// ------------------------------------
export const ROUTE_UPDATE = 'ROUTE_UPDATE'
export const SET_ROUTE_ID = 'SET_ROUTE_ID'

// ------------------------------------
// Actions
// ------------------------------------

export const setCurrentRouteID = (routeID) => {
  return {
    type    : SET_ROUTE_ID,
    payload : {
      id: routeID,
      stops: [],
    }
  }
}

/**
 * Update route data action
 * This is a thunk
 * Requests the data from the trainline server
 *
 * @return {function} function that returns a promise
 */
export const updateCurrentRoute = () => {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      const today = Moment().format('YYYY-MM-DD')
      const id = getState().route.id

      dispatch({
        type    : ROUTE_UPDATE,
        payload : null,
        status  : 'start',
      })

      superagent
        .get(`https://realtime.thetrainline.com/callingPattern/${id}/${today}`)
        .end(function(err, res) {
          if (err) {
            dispatch({
              type    : ROUTE_UPDATE,
              payload : err,
              status  : 'error',
            })
          } else {
            dispatch({
              type    : ROUTE_UPDATE,
              payload : res.body.service,
              status  : 'success',
            })
          }

          resolve()
        });
    })
  }
}

export const actions = {
  updateCurrentRoute,
  setCurrentRouteID,
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SET_ROUTE_ID]: (state, action) => {
    return Object.assign({}, state, action.payload)
  },
  [ROUTE_UPDATE]: (state, action) => {
    if (action.status === 'success') {
      return Object.assign({}, mapRouteState(action.payload), {id: state.id})
    }

    return state
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = []
export default function servicesReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
