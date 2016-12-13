import React from 'react'
import { Link } from 'react-router'

export const Service = (props) => {
  const { item } = props
  const url = '/route/' + item.key

  return (
  <li className="service__item">
    <Link to={url} className="service__link">
      <div className="service__station" >
        <span className="service__time" >{item.due}</span>
        <span className="service__destination" >{item.destination}</span>
        {item.platform ?
        <span className="service__platform">
          <abbr title="Platform" >Plat. </abbr>
          <span >{item.platform}</span>
        </span>
        :
        <span className="service__platform">
          <span >-</span>
        </span>
        }
      </div>
      <div className="service__detail" >
        <span className="service__operator">{item.operator}</span>
        {!item.notOnTime ?
        <span className="service__expected service__expected--ontime" >On time</span>
        :
        <span className="service__expected">
          <abbr title="Expected at" >Exp. </abbr>
          <span >{item.expected}</span>
        </span>
        }
      </div>
      <i className="service__icon material-icons">chevron_right</i>
    </Link>
  </li>
  )
}

Service.propTypes = {
  item     : React.PropTypes.object.isRequired
}

export default Service
