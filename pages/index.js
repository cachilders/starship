import 'isomorphic-unfetch'
import React, { Fragment } from 'react'
import { bindActionCreators } from 'redux'
import withRedux from 'next-redux-wrapper'
import { Container, Divider, Loader } from 'semantic-ui-react'
import { initStore, getStars, sortStars, setUser, unstar, clearWarning } from '../store'
import Head from '../components/head'
import Login from '../components/login'
import Modal from '../components/modal'
import StarsList from '../components/stars-list.js'
import Style from '../components/styles'

class Main extends React.Component {
  static getInitialProps ({ store, isServer }) {
    return { isServer }
  }

  componentDidMount() {
    const { username, access } = this.props.url.query
    if (username && access) {
      this.props.setUser(username, access)
    }
  }

  componentDidUpdate() {
    if (this.props.username && this.props.stars.length === 0) this.props.getStars()
  }

  render() {
    const { access, username } = this.props
    const hasStars = this.props.stars.length > 0
    return (
      <Fragment>
        <Head />
        <Container textAlign={ username ? 'left' : 'center' } fluid={ !username } text={ !!username }>
          <Modal { ...this.props } />
          <Divider hidden />
          {
            username && access ?
            <Fragment>
              {
                hasStars ? <StarsList { ...Object.assign({ hasStars }, this.props) } />
                : <Loader size="big" active />
              }
            </Fragment> :
            <Login />
          }
        </Container>
        <Style />
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    access: state.access,
    sortBy: state.sortBy,
    stars: state.stars,
    username: state.username,
    warning: state.warning,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    clearWarning: bindActionCreators(clearWarning, dispatch),
    getStars: bindActionCreators(getStars, dispatch),
    setUser: bindActionCreators(setUser, dispatch),
    sortStars: bindActionCreators(sortStars, dispatch),
    unstar: bindActionCreators(unstar, dispatch),
  }
}

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(Main)
