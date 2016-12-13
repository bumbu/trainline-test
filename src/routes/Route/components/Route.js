import React, { Component } from 'react'
import { Link } from 'react-router'
import Station from './Station'

export class Route extends Component {
  static propTypes = {
    updateCurrentRoute: React.PropTypes.func.isRequired,
    route: React.PropTypes.object.isRequired,
  }

  updateTimerID = null

  componentDidMount () {
    // Start timer
    this.checkForUpdates()
    this.updateTimerID = setInterval(() => this.checkForUpdates(), 10000)
  }

  checkForUpdates () {
    if (this.props.updateCurrentRoute) {
      this.props.updateCurrentRoute()
    }
  }

  componentWillUnmount () {
    // Stop timer
    if (this.updateTimerID) clearInterval(this.updateTimerID)
  }

  render () {
    const { route } = this.props

    return (
      <div className="content-container">
        <i className="content-container__icon material-icons">train</i>
        <h3 className="content-container__title">
          <div>{route.origin}</div>
          <span className="content-container__subtle">to</span>
          <span>{' '}</span>
          <span>{route.destination}</span>
          <small className="content-container__operator">
            <span>Operated by </span>
            <span>{route.operator}</span>
          </small>
        </h3>
        <Link to="/services" className="content-container__close material-icons">close</Link>

        <ul className="callings">
          {route.stops && route.stops.map(item => {
            return <Station item={item} key={item.key} />
          })}
        </ul>
      </div>
    )
  }
}

export default Route
