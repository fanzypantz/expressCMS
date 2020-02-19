export const state = () => ({
  user: null,
  isLoggingIn: false,
  isSigningUp: false
});

export const mutations = {
  setUser(state, user) {
    state.user = user;
  },

  toggleLogin(state) {
    state.isLoggingIn = !state.isLoggingIn;
  },

  toggleSignup(state) {
    state.isSigningUp = !state.isSigningUp;
  }
};

export const actions = {
  nuxtServerInit({ commit }, { req }) {
    console.log('session: ', req.session);
    if (req.session && req.session.authUser) {
      commit('setUser', req.session.authUser);
    }
  }
};
