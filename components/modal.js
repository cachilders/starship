import { Button, Modal } from 'semantic-ui-react'

export default ({ warning, clearWarning, deleteStar }) =>
  <Modal size="tiny" open={ !!warning }>
    <Modal.Content>
      <p>{ warning }</p>
    </Modal.Content>
    <Modal.Actions>
      <Button positive icon="star" labelPosition="right" content="No" onClick={ () => clearWarning() } />
      <Button negative icon="star empty" labelPosition="right" content="Yes" onClick={ () => deleteStar() }/>
    </Modal.Actions>
  </Modal>
