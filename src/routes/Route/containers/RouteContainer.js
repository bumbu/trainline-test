import { connect } from 'react-redux'

import Route from '../components/Route'

const mapDispatchToProps = {}

const mapStateToProps = (state) => ({
  route : state.route
})

export default connect(mapStateToProps, mapDispatchToProps)(Route)
