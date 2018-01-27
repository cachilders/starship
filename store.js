import copy from 'copy-to-clipboard'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { default as thunkMiddleware } from 'redux-thunk'

const initialState = {
  access: void 0,
  raw: [],
  sortBy: 'starred',
  stagedStar: void 0,
  stars: [],
  username: void 0,
  warning: void 0,
  exporting: false,
}

export const domain = 'https://zoneofavoidance.com'

export const actionTypes = {
  CLEAR_WARNING: 'CLEAR_WARNING',
  EXPORT_STARS: 'EXPORT_STARS',
  SET_SORT: 'SET_SORT',
  SET_STARS: 'SET_STARS',
  SET_USER: 'SET_USER',
  SET_WARNING: 'SET_WARNING',
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CLEAR_WARNING:
      return Object.assign({}, state, { warning: action.warning, stagedStar: action.stagedStar, stars: action.stars })
    case actionTypes.EXPORT_STARS:
      return Object.assign({}, state, { exporting: action.exporting })
    case actionTypes.SET_SORT:
      return Object.assign({}, state, { sortBy: action.sortBy, stars: action.stars })
    case actionTypes.SET_STARS:
      return Object.assign({}, state, { stars: action.stars, raw: action.stars.slice() })
    case actionTypes.SET_USER:
      return Object.assign({}, state, { username: action.username, access: action.access })
    case actionTypes.SET_WARNING:
      return Object.assign({}, state, { warning: action.warning, stagedStar: action.stagedStar })
    default:
      return state
  }
}

export const setUser = (username, access) => {
  return (dispatch) => dispatch({type: actionTypes.SET_USER, username, access})
}

export const getStars = () => {
  return async (dispatch, getState) => {
    const { username, access } = await getState()
    const res = await fetch(`${domain}/stars?username=${username}&access=${access}`)
    const json = await res.json()
    const stars = [...json]
    return dispatch({ type: actionTypes.SET_STARS, stars })
  }
}

export const deleteStar = () => {
  return async (dispatch, getState) => {
    const { access, stagedStar, stars } = await getState()
    const { name, owner } = stagedStar
    let newStars
    const res = await fetch(`${domain}/unstar?access=${access}&repo=${name}&owner=${owner.login}`)
    if (res.status === 204) {
      newStars = stars.filter((star) => star.name !== name && star.owner !== owner)
    }
    return dispatch({ type: actionTypes.CLEAR_WARNING, warning: void 0, stagedStar: void 0, stars: newStars || stars })
  }
}

export const exportStars = () => {
  return async (dispatch, getState) => {
    dispatch({ type: actionTypes.EXPORT_STARS, exporting: true })
    const { access, username } = await getState()
    const res = await fetch(`${domain}/export?username=${username}&access=${access}`, {method: 'POST'})
    if ([200, 201].indexOf(res.status) >= 0) {
      // TODO: Play with button state here
      const gist = await res.json()
      copy(gist.url, {
        message: 'Your star data is at this address. Copy with #{key}.',
      })
      console.log(gist.url)
    } else {
      console.log('export failed')
    }
    // Reconsider exporting state in favor of something more dramatic as mentioned above
    return dispatch({ type: actionTypes.EXPORT_STARS, exporting: false })
  }
}

export const sortStars = (sortBy) => {
  return (dispatch, getState) => {
    return dispatch({
      type: actionTypes.SET_SORT,
      sortBy,
      stars: sortBy === 'starred' ? getState().raw : getState().stars.sort((a, b) => {
        if (sortBy === 'alpha') {
          const aName = a.name.toLowerCase()
          const bName = b.name.toLowerCase()
          if (aName > bName) {
            return +1
          } else if (aName < bName) {
            return -1
          } else {
            return 0
          }
        } else if (sortBy === 'updatedAt') {
          const aDate = new Date(a.updated_at)
          const bDate = new Date(b.updated_at)
          return bDate - aDate
        } else if (sortBy === 'language') {
          const aLang = a.language ? a.language.toLowerCase() : 'N/A'
          const bLang = b.language ? b.language.toLowerCase() : 'N/A'
          if (aLang > bLang) {
            return +1
          } else if (aLang < bLang) {
            return -1
          } else {
            return 0
          }
        }
      }),
    })
  }
}

export const unstar = (star) => {
  return (dispatch, getState) => {
    const { name, owner } = star
    const warning = <span>Are you sure you want to <strong>unstar</strong> {name} by {owner.login}?</span>
    return dispatch({ type: actionTypes.SET_WARNING, warning, stagedStar: star })
  }
}

export const clearWarning = () => {
  return async (dispatch, getState) => {
    const { stars } = await getState()
    return dispatch({ type: actionTypes.CLEAR_WARNING, warning: void 0, stagedStar: void 0, stars })
  }
}

export const initStore = () => {
  return createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)))
}
