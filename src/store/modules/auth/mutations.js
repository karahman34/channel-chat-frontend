export default {
  SET_USER(state, user) {
    state.user = user;
  },
  SET_LOGGED_IN(state, val) {
    state.loggedIn = val;
  },
  CLEAR(state) {
    state.user = null;
    state.loggedIn = false;
  }
};
