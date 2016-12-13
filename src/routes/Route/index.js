import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'route/:routeID',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define dependencies for bundling   */
      const Route = require('./containers/RouteContainer').default
      const reducer = require('./modules/route').default
      injectReducer(store, { key: 'route', reducer })
      // Update route ID
      const updateAction = require('./modules/route').setCurrentRouteID(nextState.params.routeID)
      store.dispatch(updateAction)
      // Run
      cb(null, Route)
    }, 'route') // Webpack named bundle
  }
})
