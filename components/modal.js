import { Button, Modal } from 'semantic-ui-react'

export default ({ warning, clearWarning }) =>
  <Modal size="small" open={ !!warning }>
    <Modal.Content>
      <p>{ warning }</p>
    </Modal.Content>
    <Modal.Actions>
      <Button negative onClick={ () => clearWarning() }>
        No
      </Button>
      <Button positive icon='checkmark' labelPosition='right' content='Yes' />
    </Modal.Actions>
  </Modal>
