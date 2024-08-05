export default {
  state: {
    user: JSON.parse(localStorage.getItem("user")) || null,
  },
  getters: {
    isAuthenticated: (state) => Boolean(state.user),
    currentUser: (state) => state.user,
  },
  mutations: {
    registrationUser(state, user) {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      users.push(user);
      localStorage.setItem("users", JSON.stringify(users));
    },
    loginUser(state, { email, password }) {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const user = users.find(
        (user) => user.email === email && user.password === password
      );
      if (user) {
        state.user = user;
        localStorage.setItem("user", JSON.stringify(user));
      }
    },
    logout(state) {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
  actions: {
    login({ commit }, user) {
      commit("loginUser", user);
    },
    logout({ commit }) {
      commit("logout");
    },
    register({ commit }, user) {
      commit("registrationUser", user);
    },
    resetState({ commit }) {
      commit("logout");
    },
  },
};
