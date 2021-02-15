// Action Type
const LOGGED_IN_USER = 'LOGGED_IN_USER'
const SIGN_OUT_USER = 'SIGN_OUT_USER'

// Action Creator
export const setNewUser = (user) => ({
  type: LOGGED_IN_USER,
  user,
})
export const signOutUser = (user) => ({
  type: LOGGED_IN_USER,
  user,
})

// Reducer
export default (state = {}, action) => {
  switch (action.type) {
    case LOGGED_IN_USER:
      return action.user
    case SIGN_OUT_USER:
      return state
    default:
      return state
  }
}
