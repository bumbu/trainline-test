import React, { Component } from 'react'

import Service from './Service'
const UPDATE_INTERVAL = 7000

export class Services extends Component {
  static propTypes = {
    updateServices: React.PropTypes.func.isRequired,
    services: React.PropTypes.array.isRequired,
    UPDATE_INTERVAL: React.PropTypes.number,
  }

  updateTimerID = null

  componentDidMount () {
    // Start timer
    this.checkForUpdates()
    this.updateTimerID = setInterval(() => this.checkForUpdates(), this.props.UPDATE_INTERVAL || UPDATE_INTERVAL)
  }

  checkForUpdates () {
    if (this.props.updateServices) {
      this.props.updateServices()
    }
  }

  componentWillUnmount () {
    // Stop timer
    if (this.updateTimerID) clearInterval(this.updateTimerID)
  }

  render () {
    const { services } = this.props

    return (
      <div className="service">
        <ul className="service__list">
          {services.map(item => {
            return <Service item={item} key={item.key} />
          })}
        </ul>
      </div>
    )
  }
}

export default Services
