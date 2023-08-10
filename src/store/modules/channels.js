// store/modules/channels.js
const state = {
  channels: [],
};

const mutations = {
  ADD_CHANNEL(state, channel) {
    state.channels.push(channel);
  },
  ADD_MESSAGE(state, { id, message }) {
    // console.log("chaneskk---", state.channels);
    // console.log("getting channel id", id);
    const channel = state.channels.find((c) => c.id == id);
    console.log("find channle", channel);
    if (channel) {
      console.log("inside chan", message);
      if (!channel.messages) {
        channel.messages = [];
      }
      channel.messages.push(message);
    }
  },
};

const actions = {
  addChannel({ commit }, channel) {
    const newId = Date.now(); // Using timestamp as a simple way to generate a unique id
    const newChannel = { ...channel, id: newId, messages: [] };
    commit("ADD_CHANNEL", newChannel);
  },
  addMessageToChannel({ commit }, { id, message }) {
    console.log("channelId----action", id);
    console.log("message----", message);
    commit("ADD_MESSAGE", { id, message });
  },
};

const getters = {
  allChannels: (state) => state.channels,
  getChannelById: (state) => (id) =>
    state.channels.find((channel) => channel.id === id),
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
