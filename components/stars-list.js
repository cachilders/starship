import { Fragment } from 'react'
import { Divider, Input, List } from 'semantic-ui-react'
import Downshift from 'downshift'
import Selector from './selector'
import Star from './star'

export default ({ sortBy, stars, sortStars, hasStars }) =>
    <Downshift
      render={({
        getInputProps,
        getRootProps,
        inputValue,
      }) => (
        <Fragment { ...getRootProps({refKey: 'innerRef'}) } >
          <Selector
            handleChange={ (e, data) => sortStars(data.value) }
            sortBy={ sortBy }
            hasStars={ hasStars }
          /> {' '}
          <Input transparent { ...getInputProps({placeholder: 'Search'}) } />
          <Divider hidden />
          <List divided relaxed>
            { 
              stars.filter(
                star =>
                  !inputValue ||
                  star.full_name.toLowerCase().includes(inputValue.toLowerCase()) ||
                  star.description && star.description.toLowerCase().includes(inputValue.toLowerCase())
              )
              .map(
                star => star.private ? null : <Star key={ star.id } star={ star } sortBy={ sortBy } />
              )
            }
          </List>
        </Fragment>
      )}
    />
