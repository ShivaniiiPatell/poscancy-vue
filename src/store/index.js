import Vue from "vue";
import Vuex from "vuex";
import user from "./modules/user";
import auth from "./modules/auth";
import events from "./modules/events";
import channels from "./modules/channels";
Vue.use(Vuex);
export default new Vuex.Store({
  modules: {
    user: user,
    auth: auth,
    events: events,
    channels: channels,
  },
});
