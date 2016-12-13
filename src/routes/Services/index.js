import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'services',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define dependencies for bundling   */
      const Services = require('./containers/ServicesContainer').default
      const reducer = require('./modules/services').default
      injectReducer(store, { key: 'services', reducer })
      cb(null, Services)
    }, 'services') // Webpack named bundle
  }
})
