import { connect } from 'react-redux'
import { updateServices } from '../modules/services'

import Services from '../components/Services'

const mapDispatchToProps = {
  updateServices
}

const mapStateToProps = (state) => ({
  services : state.services
})

export default connect(mapStateToProps, mapDispatchToProps)(Services)
