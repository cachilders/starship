import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { default as thunkMiddleware } from 'redux-thunk'

const initialState = {
  access: void 0,
  raw: [],
  sortBy: 'starred',
  stars: [],
  username: void 0,
}

export const actionTypes = {
  SET_SORT: 'SET_SORT',
  SET_STARS: 'SET_STARS',
  SET_USER: 'SET_USER',
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_SORT:
      return Object.assign({}, state, { sortBy: action.sortBy, stars: action.stars })
    case actionTypes.SET_STARS:
      return Object.assign({}, state, { stars: action.stars, raw: action.stars.slice() })
    case actionTypes.SET_USER:
      return Object.assign({}, state, { username: action.username, access: action.access })
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
    const res = await fetch(`https://zoneofavoidance.com/stars?username=${username}&access=${access}`)
    const json = await res.json()
    const stars = [...json]
    return dispatch({ type: actionTypes.SET_STARS, stars })
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

export const initStore = () => {
  return createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)))
}
