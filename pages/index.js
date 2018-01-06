import 'isomorphic-unfetch'
import React, { Fragment } from 'react'
import Head from 'next/head'

export default class extends React.Component {
  static async getInitialProps() {
    const sortBy = 'updatedAt'
    const res = await fetch('https://api.github.com/users/cachilders/starred')
    const json = await res.json()
    const stars = [...json]
      // Not quite...
      .sort((a, b) => {
        if (sortBy === 'alpha') {
          const aName = a.full_name.toLowerCase()
          const bName = b.full_name.toLowerCase()
          if (aName > bName) {
            return +1
          } else if (aName < bName) {
            return -1
          } else {
            return 0
          }
        } else if (sortBy === 'updatedAt') {
          return b.updated_at - a.updated_at
        } else if (sortBy === 'language') {
          const aLang = a.language.toLowerCase()
          const bLang = b.language.toLowerCase()
          if (aLang > bLang) {
            return +1
          } else if (aLang < bLang) {
            return -1
          } else {
            return 0
          }
        }
      })
      .map(
        star => <p><strong><a href={ star.html_url }>{ star.full_name }</a></strong><br />{ star.description }</p>
      )
    return { stars, sortBy }
  }

  // Not wired up or working
  handleChange(e) {
    this.setState({ sortBy: e.target.value });
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
            <select name="sortBy" onChange={ this.handleChange } value={this.props.sortBy}>
              <option value="updatedAt">Last Updated</option>
              <option value="language">Language</option>
              <option value="alpha">Alphabetical</option>
            </select>
          </p>
        </div>
        <div>
          { this.props.stars }
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