import 'isomorphic-unfetch'
import React, { Fragment } from 'react'
import { bindActionCreators } from 'redux'
import withRedux from 'next-redux-wrapper'
import { Container, Divider, Loader } from 'semantic-ui-react'
import { initStore, getStars, sortStars } from '../store'
import Head from '../components/head'
import Selector from '../components/selector'
import Star from '../components/star'
import Styles from '../components/styles'

class Main extends React.Component {
  static getInitialProps ({ store, isServer }) {
    return { isServer }
  }

  componentDidMount() {
    this.props.getStars()
  }

  render() {
    const { sortBy, stars, sortStars } = this.props
    const hasStars = stars.length > 0
    return (
      <Fragment>
        <Head />
        <Container text>
          <Divider hidden />
          <Selector
            handleChange={ (e, data) => sortStars(data.value) }
            sortBy={ sortBy }
            hasStars={ hasStars }
          />
          <Divider hidden />
          { 
            hasStars ? stars
              .map(
                star => star.private ? null : <Star key={ star.id } star={ star } sortBy={ sortBy } />
              ) : <Loader size="big" active inline />
          }
        </Container>
        {/* <Styles /> */}
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
