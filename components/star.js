export default ({ star, sortBy }) =>
  <p>
    <i className="fa fa-star-o" aria-hidden="true"></i>
    {' '}
    <a href={ star.html_url }>
      { sortBy === 'language' && star.language ? <span>{ `[${star.language}] ` }</span> : null}
      <strong>{ star.full_name }</strong>
    </a><br />
      {
        star.description
      }
  </p>
