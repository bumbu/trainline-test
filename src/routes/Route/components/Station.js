import React from 'react'

export const Station = (props) => {
  const { item } = props
  let classNames = ['calling']
  if (item.hasDeparted) classNames.push('calling--departed')
  if (item.isOrigin) classNames.push('calling--origin')
  if (item.isDestination) classNames.push('calling--destination')
  if (item.isTrainHere) classNames.push('calling--current')
  const mainClass = classNames.join(' ')

  return (
    <li className={mainClass}>
      <div className="calling__time">{item.scheduledAt}</div>
      <div className="calling__station">
        {item.isTrainHere ? <i className="calling__icon material-icons">train</i> : null}
        <div className="calling__station-name">{item.station}</div>
        <div className="calling__station-due">
          <span>{item.status}</span>
        </div>
      </div>
    </li>
  )
}

export default Station
