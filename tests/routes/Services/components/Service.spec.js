import React from 'react'
import { Service } from 'routes/Services/components/Service'
import { shallow } from 'enzyme'

describe('(Component) Service', () => {
  let _props, _wrapper

  beforeEach(() => {
    _props = {
      item : {
        key: 1,
        due: '12:00',
        destination: 'Fleet',
        platform: 10,
        operator: 'SWT',
        notOnTime: false,
        expected: '12:05',
      },
    }
    _wrapper = shallow(<Service {..._props} />)
  })

  it('Should render as a <li>.', () => {
    expect(_wrapper.is('li')).to.equal(true)
  })

  it('Should render a Link to Route component', () => {
    const url = `/route/${_props.item.key}`
    expect(_wrapper.find('Link').prop('to')).to.equal(url)
  })

  it('Should show platform number when it is available', () => {
    const _platform = _wrapper.find('.service__platform').at(0)
    expect(_platform.text()).to.equal('Plat. 10')
  })

  it('Should show a placeholder when platform is not available', () => {
    const newItem = Object.assign({}, _props.item, {platform: null})
    _wrapper.setProps({item: newItem})

    const _platform = _wrapper.find('.service__platform').at(0)
    expect(_platform.text()).to.equal('-')
  })

  it('Should show on time', () => {
    const _expected = _wrapper.find('.service__expected').at(0)

    expect(_expected.hasClass('service__expected--ontime')).to.be.true
    expect(_expected.text()).to.equal('On time')
  })

  it('Should show expected time when not on time', () => {
    const newItem = Object.assign({}, _props.item, {notOnTime: true})
    _wrapper.setProps({item: newItem})

    const _expected = _wrapper.find('.service__expected').at(0)

    expect(_expected.hasClass('service__expected--ontime')).to.be.false
  })
})
