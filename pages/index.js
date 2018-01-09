import 'isomorphic-unfetch'
import React, { Fragment } from 'react'
import Head from 'next/head'
import Star from '../components/star'

export default class extends React.Component {
  constructor() {
    super();
    this.state = {
      username: 'cachilders' // Temporary, natch
    };
    this.handleChange = this.handleChange.bind(this)
  }

  async setStars() {
    async function fetchStars(page = 1, res = []) {
      let url = `https://api.github.com/users/${this.state.username}/starred?page=${page}&per_page=100`
      const pageRaw = await fetch(url)
      const pageRes = await pageRaw.json()
      if (pageRes.length === 100) {
        return fetchStars.call(this, page + 1, res.concat(pageRes))
      }
      return res.concat(pageRes)
    }
    const res = await fetchStars.call(this)
    const stars = [...res]
    const sortBy = 'starred'
    this.setState({ sortBy, stars, raw: stars.slice() })
  }

  componentDidMount() {
    this.setStars()
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
          <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css" />
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
              star => star.private ? null : <Star key={ star.id } star={ star } />
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
