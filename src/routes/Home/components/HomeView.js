import React from 'react'
import { IndexLink, Link } from 'react-router'

export const HomeView = () => (
  <div>
    <Link to='/services'>
      Go to Services listing
    </Link>
  </div>
)

export default HomeView
