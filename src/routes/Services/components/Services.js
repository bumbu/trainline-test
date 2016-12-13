import React from 'react'

export const Services = (props) => (
  <div className="service">
    <ul className="service__list">
      <li className="service__item">
        <a className="service__link" href="/live/departures/london-waterloo/aytQeloxYSsvZ2RHSlV5V3QvUm11UT09" rel="nofollow" >
          <div className="service__station" >
            <span className="service__time" >18:32</span>
            <span className="service__destination" >Basingstoke</span>
            <span className="service__platform" >
              <abbr title="Platform" >Plat. </abbr>
              <span >11</span>
            </span>
          </div>
          <div className="service__detail" >
            <span className="service__operator" >South West Trains</span>
            <span className="service__expected" >
              <abbr title="Expected at" >Exp. </abbr>
              <span >18:39</span>
            </span>
          </div>
          <i className="service__icon material-icons">chevron_right</i>
        </a>
      </li>
      <li className="service__item service__item--selected">
        <a className="service__link" href="/live/departures/london-waterloo/aytQeloxYSsvZ2RHSlV5V3QvUm11UT09" rel="nofollow" >
          <div className="service__station" >
            <span className="service__time" >18:32</span>
            <span className="service__destination" >Basingstoke</span>
            <span className="service__platform" >
              <abbr title="Platform" >Plat. </abbr>
              <span >11</span>
            </span>
          </div>
          <div className="service__detail" >
            <span className="service__operator" >South West Trains</span>
            <span className="service__expected service__expected--ontime" >On time</span>
          </div>
          <i className="service__icon material-icons">chevron_right</i>
        </a>
      </li>
    </ul>
  </div>
)

// Services.propTypes = {
//   counter     : React.PropTypes.number.isRequired,
//   doubleAsync : React.PropTypes.func.isRequired,
//   increment   : React.PropTypes.func.isRequired
// }

export default Services
