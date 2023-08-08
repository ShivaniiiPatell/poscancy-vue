// store/users.js
import axios from "axios";

const state = {
  users: [],
};

const getters = {
  allUsers: (state) => state.users,
};

const mutations = {
  SET_USERS(state, users) {
    state.users = users;
  },
  ADD_USER(state, newUser) {
    state.users.push(newUser);
  },
  REMOVE_USER(state, userId) {
    state.users = state.users.filter((user) => user.id !== userId);
  },
};

const actions = {
  async fetchAllUsers({ rootState, commit }) {
    try {
      // Retrieve the token from the auth store module
      const token = rootState.auth.userToken;
      console.log("token", token);
      // Make the API request with the token in the Authorization header
      // const response = await axios.get("/users", {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // });
      const response = await axios.get(`http://localhost:3000/api/users`, {
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${token}`,
        },
      });

      // Save the fetched users in the Vuex store
      const users = response.data;
      console.log("users", users);
      commit("SET_USERS", users);
    } catch (error) {
      // Handle the error
    }
  },
  async addUser({ rootState, commit }, userData) {
    try {
      const token = rootState.auth.userToken;
      console.log("token", token);
      console.log("inside store userData", userData);
      const response = await axios.post(
        `http://localhost:3000/api/users`,
        userData,
        {
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Save the fetched users in the Vuex store
      const newUser = response.data;
      console.log("newUser", newUser);
      commit("ADD_USER", newUser);
    } catch (error) {
      // Handle the error
    }
  },
  async deleteUser({ rootState, commit }, userId) {
    try {
      console.log("userId in store--", userId);
      const token = rootState.auth.userToken;
      await axios.put(`http://localhost:3000/api/users/${userId}/deactivate`, {
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${token}`,
        },
      });

      // Remove the deleted user from the store
      commit("REMOVE_USER", userId);
    } catch (error) {
      // Handle the error
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
