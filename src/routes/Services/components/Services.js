import React, { Component } from 'react'

import Service from './Service'

export class Services extends Component {
  static propTypes = {
  }

  updateTimerID = null

  componentDidMount () {
    // Start timer
    this.checkForUpdates()
    this.updateTimerID = setInterval(()=> this.checkForUpdates(), 10000)
  }

  checkForUpdates() {
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
