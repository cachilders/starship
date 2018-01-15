import { Dropdown, Menu } from 'semantic-ui-react'

const options = [
  {key: 1, value: 'alpha', text: 'Alphabetical'},
  {key: 2, value: 'starred', text: 'Date Starred'},
  {key: 3, value: 'language', text: 'Language'},
  {key: 4, value: 'updatedAt', text: 'Last Updated'},
]

export default ({ handleChange, sortBy }) =>
  <Menu compact>
    <Dropdown options={options} simple item onChange={ handleChange } value={ sortBy }/>
  </Menu>
