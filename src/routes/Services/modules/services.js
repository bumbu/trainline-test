import superagent from 'superagent'
import { mapServicesState } from './utils'

// ------------------------------------
// Constants
// ------------------------------------
export const SERVICES_UPDATE = 'SERVICES_UPDATE'

// ------------------------------------
// Actions
// ------------------------------------

/**
 * Update services data action
 * This is a thunk
 * Requests the data from the trainline server
 *
 * @return {function} function that returns a promise
 */
export const updateServices = () => {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      dispatch({
        type    : SERVICES_UPDATE,
        payload : null,
        status  : 'start',
      })

      superagent
        .get('https://realtime.thetrainline.com/departures/wat')
        .end(function(err, res) {
          if (err) {
            dispatch({
              type    : SERVICES_UPDATE,
              payload : err,
              status  : 'error',
            })
          } else {
            dispatch({
              type    : SERVICES_UPDATE,
              payload : res.body.services,
              status  : 'success',
            })
          }

          resolve()
        });
    })
  }
}

export const actions = {
  updateServices
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SERVICES_UPDATE]    : (state, action) => {
    if (action.status === 'success') {
      return mapServicesState(action.payload)
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
