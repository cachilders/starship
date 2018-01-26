import { Button } from 'semantic-ui-react'
// TODO: Display url and copy to clipboard
export default ({ exporting, exportStars }) =>
  <Button positive icon="save" disabled={ exporting } labelPosition="right" content="Export to gist" onClick={ () => exportStars() } />
