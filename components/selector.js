export default ({ handleChange, sortBy }) =>
  <div>
    <p>
      Sort by
      <select name="sortBy" onChange={ handleChange } value={ sortBy }>
        <option value="alpha">Alphabetical</option>
        <option value="language">Language</option>
        <option value="starred">Date Starred</option>
        <option value="updatedAt">Last Updated</option>
      </select>
    </p>
  </div>