import { Fragment } from 'react'
import { Button, Header } from 'semantic-ui-react'
import { domain } from '../store'

export default () =>
  <Fragment>
    <Header as="h1">
      stargo
      <Header.Subheader>
        Your Github stars, gathered up and made useful.
      </Header.Subheader>
    </Header>
    <a href={ `${domain}/authenticate` }>
      <Button.Group positive labeled icon>
        <Button icon="github" content="Login with Github" />
      </Button.Group>
    </a>
  </Fragment>
