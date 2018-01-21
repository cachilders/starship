import { List } from 'semantic-ui-react'
import { getUnicode } from 'emoji-dictionary';

export default ({ star, sortBy }) =>
  <List.Item>
    <List.Icon name='empty star' size='large' verticalAlign='middle' />
    <List.Content>
      <List.Header as='a' href={ star.html_url }>
        { sortBy === 'language' && star.language ? <span>{ `[${star.language}] ` }</span> : null}
        { star.full_name }
      </List.Header>
      {  star.description &&
        <List.Description>
          { star.description.replace(/:.*:/g, (str) => getUnicode(str.replace(/:/g, ''))) }
        </List.Description>
      }
    </List.Content>
  </List.Item>
