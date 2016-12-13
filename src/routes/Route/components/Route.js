import React from 'react'
import { Link } from 'react-router'

export const Service = (props) => (
  <div className="content-container">
    <i className="content-container__icon material-icons">train</i>
    <h3 className="content-container__title">
      <div>London Waterloo</div>
      <span className="content-container__subtle">to</span>
      <span> </span>
      <span>Reading</span>
      <small className="content-container__operator">
        <span>Operated by </span>
        <span>South West Trains</span>
      </small>
    </h3>
    <Link to="/services" className="content-container__close material-icons">close</Link>

    <ul className="callings">
      <li className="calling calling--departed calling--selected calling--origin">
        <div className="calling__time">19:05</div>
        <div className="calling__station">
          <div className="calling__station-name">London Waterloo</div>
          <div className="calling__station-due">
            <span>On time</span>
          </div>
        </div>
      </li>
      <li className="calling calling--departed calling--current">
        <div className="calling__time">19:09</div>
        <div className="calling__station">
          <i className="calling__icon material-icons">train</i>
          <div className="calling__station-name">Vauxhall</div>
          <div className="calling__station-due">
            <span>On time</span>
          </div>
        </div>
      </li>
      <li className="calling">
        <div className="calling__time">19:14</div>
        <div className="calling__station">
          <div className="calling__station-name">Clapham Junction</div>
          <div className="calling__station-due">
            <span>On time</span>
          </div>
        </div>
      </li>
      <li className="calling">
        <div className="calling__time">19:14</div>
        <div className="calling__station">
          <div className="calling__station-name">Clapham Junction</div>
          <div className="calling__station-due">
            <span>On time</span>
          </div>
        </div>
      </li>
      <li className="calling calling--destination">
        <div className="calling__time">19:14</div>
        <div className="calling__station">
          <div className="calling__station-name">Clapham Junction</div>
          <div className="calling__station-due">
            <span>On time</span>
          </div>
        </div>
      </li>
    </ul>
  </div>
)

// Service.propTypes = {
//   counter     : React.PropTypes.number.isRequired,
//   doubleAsync : React.PropTypes.func.isRequired,
//   increment   : React.PropTypes.func.isRequired
// }

export default Service
