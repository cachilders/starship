import { Dropdown } from 'semantic-ui-react'
import { Fragment } from 'react'

const options = [
  {key: 1, value: 'alpha', text: 'Alphabetical'},
  {key: 2, value: 'starred', text: 'Date Starred'},
  {key: 3, value: 'language', text: 'Language'},
  {key: 4, value: 'updatedAt', text: 'Last Updated'},
]

export default ({ handleChange, sortBy, hasStars }) =>
  <Fragment>
    Sort repos by { ' ' }
    <Dropdown
      options={ options }
      onChange={ handleChange }
      value={ sortBy }
      disabled={ !hasStars }
      closeOnChange
      inline
    />
  </Fragment>
