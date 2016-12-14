import React from 'react'
import { HomeView } from 'routes/Home/components/HomeView'
import { shallow } from 'enzyme'
import { Link } from 'react-router'

describe('(View) Home', () => {
  let _component

  beforeEach(() => {
    _component = shallow(<HomeView />)
  })

  it('Should render a Link to Services component', () => {
    expect(_component.contains(
      <Link to="/services">
        Go to Services listing
      </Link>
    )).to.be.true
  })
})
