import 'isomorphic-unfetch'
import Router from 'next/router'
import React, { Fragment } from 'react'
import { bindActionCreators } from 'redux'
import withRedux from 'next-redux-wrapper'
import { Button, Container, Divider, Loader } from 'semantic-ui-react'
import { initStore, getStars, sortStars, setUser } from '../store'
import Head from '../components/head'
import StarsList from '../components/stars-list.js'

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
    if (this.props.username) this.props.getStars()
  }

  render() {
    const { username, access } = this.props
    const hasStars = this.props.stars.length > 0
    return (
      <Fragment>
        <Head />
        <Container textAlign={ username ? 'left' : 'center' } fluid={ !username } text={ !!username }>
          <Divider hidden />
          {
            username && access ?
            <Fragment>
              {
                hasStars ? <StarsList { ...Object.assign({ hasStars }, this.props) } />
                : <Loader size="big" active />
              }
            </Fragment> :
            <a href="https://zoneofavoidance.com/authenticate">
              <Button.Group positive labeled icon>
                <Button icon="github" content="Login with Github" />
              </Button.Group>
            </a>
          }
        </Container>
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    sortBy: state.sortBy,
    stars: state.stars,
    username: state.username,
    access: state.access,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getStars: bindActionCreators(getStars, dispatch),
    setUser: bindActionCreators(setUser, dispatch),
    sortStars: bindActionCreators(sortStars, dispatch),
  }
}

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(Main)
