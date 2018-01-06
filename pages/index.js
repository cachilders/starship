import 'isomorphic-unfetch'
import React, { Fragment } from 'react'
import Head from 'next/head'

export default class extends React.Component {
  constructor() {
    super();
    this.state = {
      username: 'cachilders' // Temporary, natch
    };
    this.handleChange = this.handleChange.bind(this)
  }
  async componentDidMount() {
    const sortBy = 'starred'
    const res = await fetch(`https://api.github.com/users/${this.state.username}/starred?per_page=100`)
    const json = await res.json()
    const stars = [...json]
    this.setState({ sortBy, stars, raw: stars.slice() })
  }

  // Not wired up or working
  handleChange(e) {
    this.setState({
      sortBy: e.target.value,
      stars: e.target.value === 'starred' ? this.state.raw : this.state.stars.sort((a, b) => {
        if (e.target.value === 'alpha') {
          const aName = a.name.toLowerCase()
          const bName = b.name.toLowerCase()
          if (aName > bName) {
            return +1
          } else if (aName < bName) {
            return -1
          } else {
            return 0
          }
        } else if (e.target.value === 'updatedAt') {
          return  new Date(b.updated_at) - new Date(a.updated_at)
        } else if (e.target.value === 'language') {
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
        <Head>
          <title>Starship</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <div>
          <p>
            Sort by
            <select name="sortBy" onChange={ this.handleChange } value={ this.state.sortBy }>
              <option value="alpha">Alphabetical</option>
              <option value="language">Language</option>
              <option value="starred">Date Starred</option>
              <option value="updatedAt">Last Updated</option>
            </select>
          </p>
        </div>
        <div>
          { this.state.stars ? this.state.stars
            .map(
              star => star.private ? null : <p key={ star.id }><strong><a href={ star.html_url }>{ star.full_name }</a></strong><br />{ star.description }</p>
          ) : null }
        </div>
        <style global jsx>{`
          p {
            font-family: helvetica;
            font-size: 10px;
            margin: 0px;
            padding: 2px;
          }
        `}</style>
      </Fragment>
    )
  }
}
