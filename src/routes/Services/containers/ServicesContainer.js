import { connect } from 'react-redux'
// import { increment, doubleAsync } from '../modules/counter'

import Services from '../components/Services'

const mapDispatchToProps = {
  // viewDetails
}

const mapStateToProps = (state) => ({
  services : state.services
})

export default connect(mapStateToProps, mapDispatchToProps)(Services)
