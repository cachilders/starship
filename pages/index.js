import 'isomorphic-unfetch'
import React, { Fragment } from 'react'
import { bindActionCreators } from 'redux'
import withRedux from 'next-redux-wrapper'
import { initStore, getStars, sortStars } from '../store'
import Head from '../components/head'
import Selector from '../components/selector'
import Star from '../components/star'
import Styles from '../components/styles'

class Main extends React.Component {
  static getInitialProps ({ store, isServer }) {
    store.dispatch(getStars())
  }

  render() {
    const { sortBy, stars, sortStars } = this.props
    console.log(sortBy, stars)
    return (
      <Fragment>
        <Head />
        <Selector handleChange={ e => sortStars(e.target.value) } sortBy={ sortBy } />
        { 
          stars ? stars
            .map(
              star => star.private ? null : <Star key={ star.id } star={ star } sortBy={ sortBy } />
            ) : null
        }
        <Styles />
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
