import { connect } from 'react-redux'
// import { increment, doubleAsync } from '../modules/counter'

import Route from '../components/Route'

const mapDispatchToProps = {
  // viewDetails
}

const mapStateToProps = (state) => ({
  route : state.route
})

export default connect(mapStateToProps, mapDispatchToProps)(Route)
