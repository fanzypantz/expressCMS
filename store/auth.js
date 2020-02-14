export const state = () => ({
  user: null,
  isLoggingIn: false,
  isSigningUp: false
})

export const mutations = {
  setUser(state, user) {
    state.user = user
  },

  toggleLogin(state) {
    state.isLoggingIn = !state.isLoggingIn
  },

  toggleSignup(state) {
    state.isSigningUp = !state.isSigningUp
  }
}
