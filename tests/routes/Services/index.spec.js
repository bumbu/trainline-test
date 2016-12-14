import ServicesRoute from 'routes/Services'

describe('(Route) Services', () => {
  let _route

  beforeEach(() => {
    _route = ServicesRoute({})
  })

  it('Should return a route configuration object', () => {
    expect(typeof _route).to.equal('object')
  })

  it('Configuration should contain path `services`', () => {
    expect(_route.path).to.equal('services')
  })
})
