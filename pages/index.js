import Router from 'next/router'
import React, { Fragment } from 'react'
import { bindActionCreators } from 'redux'
import withRedux from 'next-redux-wrapper'
import { Button, Container, Divider, Icon } from 'semantic-ui-react'
import { initStore, getStars, sortStars } from '../store'
import Head from '../components/head'

class Login extends React.Component {
  static getInitialProps ({ store, isServer }) {
    return { isServer }
  }

  render() {
    return (
      <Fragment>
        <Head />
        <Container textAlign="center" fluid>
          <Divider hidden />
          <Button.Group positive labeled icon>
            <Button icon="github" content="Login with Github" onClick={ () => Router.push('/app') } />
          </Button.Group>
        </Container>
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    sortBy: state.sortBy,
    stars: state.stars,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getStars: bindActionCreators(getStars, dispatch),
    sortStars: bindActionCreators(sortStars, dispatch)
  }
}

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(Login)
