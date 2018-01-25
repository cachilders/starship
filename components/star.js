import { Label, List } from 'semantic-ui-react'
import { getUnicode } from 'emoji-dictionary';

export default ({ star, sortBy, unstar }) => 
    <List.Item>
      <List.Icon
        name="star"
        verticalAlign="middle"
        onClick={ () => unstar(star) }
        onMouseOver={ (e) => e.target.closest('i').className = 'empty star icon middle aligned' }
        onMouseOut={ (e) => e.target.closest('i').className = 'star icon middle aligned' }
      />
      <List.Content>
        <List.Header as="a" href={ star.html_url }>
          { star.name } { star.owner && ` by ${star.owner.login}` }
        </List.Header>
        {  star.description &&
          <List.Description>
            { star.language ? <Label size="tiny" horizontal>{ star.language }</Label> : null }
            { star.description.replace(/:.*:/g, (str) => getUnicode(str.replace(/:/g, ''))) }
          </List.Description>
        }
      </List.Content>
    </List.Item>
