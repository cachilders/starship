import { Button, Modal } from 'semantic-ui-react'

export default ({ warning, clearWarning }) =>
  <Modal size="tiny" open={ !!warning }>
    <Modal.Content>
      <p>{ warning }</p>
    </Modal.Content>
    <Modal.Actions>
      <Button negative icon="star" labelPosition="right" content="No" onClick={ () => clearWarning() } />
      <Button positive icon="star empty" labelPosition="right" content="Yes" />
    </Modal.Actions>
  </Modal>
