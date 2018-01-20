import 'isomorphic-unfetch'
import React, { Fragment } from 'react'
import { bindActionCreators } from 'redux'
import withRedux from 'next-redux-wrapper'
import { Divider, Container, Loader } from 'semantic-ui-react'
import { initStore, getStars, sortStars } from '../store'
import Head from '../components/head'
import StarsList from '../components/stars-list.js'

class Main extends React.Component {
  static getInitialProps ({ store, isServer }) {
    return { isServer }
  }

  componentDidMount() {
    this.props.getStars()
  }

  render() {
    const hasStars = this.props.stars.length > 0
    return (
      <Fragment>
        <Head />
        <Container text>
          <Divider hidden />
          {
            hasStars ? <StarsList { ...Object.assign({ hasStars }, this.props) } />
            : <Loader size="big" active />
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
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getStars: bindActionCreators(getStars, dispatch),
    sortStars: bindActionCreators(sortStars, dispatch)
  }
}

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(Main)
