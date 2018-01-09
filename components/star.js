export default ({ star }) =>
  <p>
    <i class="fa fa-star-o" aria-hidden="true"></i>
    {' '}
    <strong><a href={ star.html_url }>{
      star.full_name
    }</a></strong><br />{
      // star.description
    }
  </p>
