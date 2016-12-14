import React from 'react'
import { bindActionCreators } from 'redux'
import { Services, Service } from 'routes/Services/components/Services'
import { shallow, mount } from 'enzyme'
import { Link } from 'react-router'

describe('(Component) Services', () => {
  let _props, _spies, _wrapper

  beforeEach(() => {
    _spies = {}
    _props = {
      UPDATE_INTERVAL: 200,
      services : [{key: 1,}, {key: 2}],
      ...bindActionCreators({
        updateServices : (_spies.updateServices = sinon.spy()),
      }, _spies.dispatch = sinon.spy())
    }
  })

  it('Should render as a <div>.', () => {
    _wrapper = shallow(<Services {..._props} />)
    expect(_wrapper.is('div')).to.equal(true)
  })

  it('Should call updateServices', () => {
    _wrapper = mount(<Services {..._props} />)
    _spies.dispatch.should.have.been.called
    _spies.updateServices.should.have.been.called
  })

  it('Should call updateServices after upate interval', function (done) {
    _wrapper = mount(<Services {..._props} />)

    setTimeout(() => {
      expect(_spies.updateServices.callCount).to.equal(2)
      done()
    }, 300)
  })

  it('Should not call updateServices after update interval if unmounted before', () => {
    _wrapper = mount(<Services {..._props} />)
    _wrapper.unmount()

    setTimeout(() => {
      expect(_spies.updateServices.callCount).to.equal(1)
      done()
    }, 300)
  })

  it('Should render child Service components', () => {
    _wrapper = shallow(<Services {..._props} />)
    expect(_wrapper.find('.service__list').at(0).children().length).to.equal(2)
  })
})
