import { Fragment } from 'react'
import { Divider, List } from 'semantic-ui-react'
import Selector from './selector'
import Star from './star'

export default ({ sortBy, stars, sortStars, hasStars }) =>
  <Fragment>
    <Selector
      handleChange={ (e, data) => sortStars(data.value) }
      sortBy={ sortBy }
      hasStars={ hasStars }
    />
    <Divider hidden />
    <List divided relaxed>
      { 
        stars.map(
          star => star.private ? null : <Star key={ star.id } star={ star } sortBy={ sortBy } />
        )
      }
    </List>
  </Fragment>
