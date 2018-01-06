import 'isomorphic-unfetch'
import React from 'react'

export default class extends React.Component {
  static async getInitialProps({ req }) {
    const res = await fetch('https://api.github.com/users/cachilders/starred')
    const json = await res.json()
    const stars = [...json].map(
      star => <p><a href={star.html_url}>{star.name}</a><br />{star.owner ? 'by ' + star.owner.login : null}</p>
    )
    return { stars }
  }

  render() {
    return (
      <div>
        {this.props.stars}
      </div>
    )
  }
}