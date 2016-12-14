import {
  SERVICES_UPDATE,
  updateServices,
  default as servicesReducer
} from 'routes/Services/modules/services'

const Utils = require('routes/Services/modules/utils')
const superagent = require('superagent')
const mock = require('superagent-mocker')(superagent)

describe('(Redux Module) Services', () => {
  it('Should export a constant SERVICES_UPDATE.', () => {
    expect(SERVICES_UPDATE).to.equal('SERVICES_UPDATE')
  })

  describe('(Reducer)', () => {
    it('Should be a function.', () => {
      expect(servicesReducer).to.be.a('function')
    })

    it('Should initialize with a state of [] (Empty Array).', () => {
      expect(servicesReducer(undefined, {})).to.deep.equal([])
    })

    it('Should return the previous state if an action was not matched.', () => {
      let state = servicesReducer(undefined, {})
      expect(state).to.deep.equal([])
      state = servicesReducer(state, { type: '@@@@@@@' })
      expect(state).to.deep.equal([])
    })
  })

  describe('(Action Creator) updateServices', () => {
    let _globalState
    let _dispatchSpy
    let _getStateSpy

    beforeEach(() => {
      _globalState = {
        services : servicesReducer(undefined, {})
      }
      _dispatchSpy = sinon.spy((action) => {
        _globalState = {
          ..._globalState,
          services : servicesReducer(_globalState.services, action)
        }
      })
      _getStateSpy = sinon.spy(() => {
        return _globalState
      })
    })

    it('Should be exported as a function.', () => {
      expect(updateServices).to.be.a('function')
    })

    it('Should return a function (is a thunk).', () => {
      expect(updateServices()).to.be.a('function')
    })

    it('Should return a promise from that thunk that gets fulfilled.', () => {
      mock.get('https://realtime.thetrainline.com/departures/wat', function(req) {
        mock.clearRoutes()

        return {
          body: {
            services: [{key: 1}, {key: 2}]
          }
        }
      })

      sinon.stub(Utils, 'mapServicesState', (state) => state);

      return updateServices()(_dispatchSpy, _getStateSpy)
        .then(() => {
          // Should dispatch a start and success status
          _dispatchSpy.should.have.been.calledTwice
          // Restore stub
          Utils.mapServicesState.restore();
        })
    })
  })

  describe('(Action Handler) SERVICES_UPDATE', () => {
    it('Should update the state by the action payload\'s "value" property.', function () {
      let state = servicesReducer(undefined, {})
      expect(state).to.deep.equal([])

      const payload = [{key: 1}, {key: 2}]
      const action = {
        type: SERVICES_UPDATE,
        payload,
        status: 'success',
      }

      // Stub the mapServicesState
      sinon.stub(Utils, 'mapServicesState', (state) => state);
      state = servicesReducer(state, action)
      Utils.mapServicesState.restore();

      expect(state).to.deep.equal(payload)
    })
  })
})
