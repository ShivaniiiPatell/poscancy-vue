// store/events.js
import axios from "axios";

const state = {
  events: [],
};

const getters = {
  allEvents: (state) => state.events,
  getEventById: (state) => (id) => {
    console.log("id in get", typeof id);
    console.log("stetd", state.events);
    let ans = state.events.find((event) => event._id == id);
    console.log(ans);
    return state.events.find((event) => event._id == id);
  },
  UPDATE_EVENT(state, updatedEvent) {
    const index = state.events.findIndex(
      (event) => event._id === updatedEvent._id
    );
    if (index !== -1) {
      state.events.splice(index, 1, updatedEvent);
    }
  },
};

const mutations = {
  SET_EVENTS(state, events) {
    state.events = events;
  },
  ADD_EVENT(state, newEvent) {
    state.events.push(newEvent);
  },
  UPDATE_EVENT(state, updatedEvent) {
    const index = state.events.findIndex(
      (event) => event._id === updatedEvent._id
    );
    if (index !== -1) {
      state.events.splice(index, 1, updatedEvent);
    }
  },
};

const actions = {
  async fetchAllEvents({ commit }) {
    try {
      const response = await axios.get(`http://localhost:3000/api/events`, {
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      });

      const events = response.data;
      commit("SET_EVENTS", events);
    } catch (error) {
      console.log(error);
    }
  },

  async addEvent({ commit }, eventData) {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/events`,
        eventData,
        {
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
        }
      );

      const newEvent = response.data;
      commit("ADD_EVENT", newEvent);
    } catch (error) {
      console.log(error);
    }
  },
  async updateEvent({ commit }, payload) {
    try {
      console.log("payload--- in store---", payload);
      const { eventId, eventForm } = payload;
      console.log("formFields", eventForm);
      console.log("eventId", eventId);
      const response = await axios.put(
        `http://localhost:3000/api/events/${eventId}`,
        { eventForm },
        {
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
        }
      );

      const updatedEvent = response.data;

      commit("UPDATE_EVENT", updatedEvent);
    } catch (error) {
      console.log(error);
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
