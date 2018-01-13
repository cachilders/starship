import 'isomorphic-unfetch'
import React, { Fragment } from 'react'
import Head from '../components/head'
import Selector from '../components/selector'
import Star from '../components/star'
import Styles from '../components/styles'

export default class extends React.Component {
  constructor() {
    super();
    this.state = {
      username: 'cachilders' // Temporary, natch
    };
    this.handleChange = this.handleChange.bind(this)
  }

  async setStars() {
    const res = await fetch(`http://localhost:8080/stars?username=${this.state.username}`) // Temporary
    const json = await res.json()
    const stars = [...json]
    const sortBy = 'starred'
    this.setState({ sortBy, stars, raw: stars.slice() })
  }

  componentDidMount() {
    this.setStars()
  }

  handleChange(e) {
    const sortBy = e.target.value
    this.setState({
      sortBy: sortBy,
      stars: sortBy === 'starred' ? this.state.raw : this.state.stars.sort((a, b) => {
        if (sortBy === 'alpha') {
          const aName = a.name.toLowerCase()
          const bName = b.name.toLowerCase()
          if (aName > bName) {
            return +1
          } else if (aName < bName) {
            return -1
          } else {
            return 0
          }
        } else if (sortBy === 'updatedAt') {
          const aDate = new Date(a.updated_at)
          const bDate = new Date(b.updated_at)
          return bDate - aDate
        } else if (sortBy === 'language') {
          const aLang = a.language ? a.language.toLowerCase() : 'N/A'
          const bLang = b.language ? b.language.toLowerCase() : 'N/A'
          if (aLang > bLang) {
            return +1
          } else if (aLang < bLang) {
            return -1
          } else {
            return 0
          }
        }
      }),
    })
  }

  render() {
    return (
      <Fragment>
        <Head />
        <Selector handleChange={ this.handleChange } sortBy={ this.state.sortBy } />
        { 
          this.state.stars ? this.state.stars
            .map(
              star => star.private ? null : <Star key={ star.id } star={ star } sortBy={ this.state.sortBy } />
            ) : null
        }
        <Styles />
      </Fragment>
    )
  }
}
