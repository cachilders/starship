import { List } from 'semantic-ui-react'
import { getUnicode } from 'emoji-dictionary';

export default ({ star, sortBy, unstar }) => 
    <List.Item>
      <List.Icon
        name="star"
        hover verticalAlign="middle"
        onClick={ () => unstar(star) }
        onMouseOver={ (e) => e.target.closest('i').className = 'empty star icon middle aligned' }
        onMouseOut={ (e) => e.target.closest('i').className = 'star icon middle aligned' }
      />
      <List.Content>
        <List.Header as="a" href={ star.html_url }>
          { sortBy === 'language' && star.language ? <span>{ `[${star.language}] ` }</span> : null}
          { star.name } by { star.owner && star.owner.login }
        </List.Header>
        {  star.description &&
          <List.Description>
            { star.description.replace(/:.*:/g, (str) => getUnicode(str.replace(/:/g, ''))) }
          </List.Description>
        }
      </List.Content>
    </List.Item>
