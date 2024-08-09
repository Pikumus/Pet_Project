export default {
  state: {
    user: JSON.parse(localStorage.getItem("user")) || null,
  },
  getters: {
    isAuthenticated: (state) => Boolean(state.user),
    isAgreed: (state) =>
      state.user ? Boolean(state.user.agreedToUpdates) : false,
  },
  mutations: {
    registrationUser(state, newUser) {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const userExist = users.some((user) => user.email === newUser.email);
      if (!userExist) {
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));
      }
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
    updateUserAgreement(state, agreedToUpdates) {
      if (state.user === false) {
        state.user.agreedToUpdates = agreedToUpdates;
        localStorage.setItem("user", JSON.stringify(state.user));
      }
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
    updateUserAgreement({ commit }, agreedToUpdates) {
      commit("updateUserAgreement", agreedToUpdates);
    },
  },
};
