import { connect } from 'react-redux'
import { updateCurrentRoute } from '../modules/route'

import Route from '../components/Route'

const mapDispatchToProps = {
  updateCurrentRoute
}

const mapStateToProps = (state) => ({
  route : state.route
})

export default connect(mapStateToProps, mapDispatchToProps)(Route)
