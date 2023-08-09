import axios from "axios";

const state = {
  userToken: localStorage.getItem("userToken") || null,
  isAuthenticated: false,
  loginError: null,
};

const getters = {
  isAuthenticated: (state) => state.userToken !== null,
  loginError: (state) => state.loginError,
};

const mutations = {
  SET_USER_TOKEN(state, token) {
    state.userToken = token;
    localStorage.setItem("userToken", token);
  },
  SET_LOGIN_ERROR(state, error) {
    state.loginError = error;
  },
  LOGOUT(state) {
    state.userToken = null;
    localStorage.removeItem("userToken");
  },
};

const actions = {
  async signIn({ commit }, { email, password }) {
    try {
      console.log("inside sign in");
      const response = await axios.post(
        `http://localhost:3000/api/users/login`,
        { email, password },
        { headers: { "Content-Type": "application/json; charset=UTF-8" } }
      );

      if (response.data.token) {
        const token = response.data.token;

        commit("SET_USER_TOKEN", token);
        commit("SET_LOGIN_ERROR", null);
        // this.$router.push({ name: "Home" });
      } else {
        commit("SET_LOGIN_ERROR", "Unauthorized");
      }

      // if (response.data.token) {
      //   // Redirect to home page or any other desired route
      //   // Example using Vue Router: this.$router.push({ name: "home" });
      // }
    } catch (error) {
      console.log(error);
      commit("SET_LOGIN_ERROR", "Error while trying to log in");
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
