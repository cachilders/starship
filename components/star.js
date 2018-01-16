import { List } from 'semantic-ui-react'

export default ({ star, sortBy }) =>
  <List.Item>
    <List.Icon name='empty star' size='large' verticalAlign='middle' />
    <List.Content>
      <List.Header as='a' href={ star.html_url }>
        { sortBy === 'language' && star.language ? <span>{ `[${star.language}] ` }</span> : null}
        { star.full_name }
      </List.Header>
      <List.Description as='a'>{ star.description }</List.Description>
    </List.Content>
  </List.Item>
