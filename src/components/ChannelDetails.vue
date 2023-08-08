<template>
  <div>
    <h2>Channel Details</h2>

    <div v-if="channel">
      <p>Name: {{ channel.title }}</p>
      <p>Description: {{ channel.description }}</p>
    </div>

    <div v-if="channel">
      <h3>Messages</h3>
      <ul>
        <li v-for="(message, index) in channel.messages" :key="index">
          {{ message }}
        </li>
      </ul>
    </div>

    <div v-if="channel">
      <input
        v-model="newMessage"
        type="text"
        placeholder="Enter your message"
      />
      <button @click="sendMessage">Send Message</button>
    </div>
  </div>
</template>


<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "ChannelDetails",
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      newMessage: "",
    };
  },
  computed: {
    // Use mapGetters to map Vuex getters to computed properties
    ...mapGetters("channels", ["getChannelById"]),
    channel() {
      let data = this.getChannelById(Number(this.id));
      console.log("data", data);
      return this.getChannelById(Number(this.id));
    },
  },
  methods: {
    ...mapActions("channels", ["addMessageToChannel"]),
    sendMessage() {
      this.addMessageToChannel({
        id: this.id,
        message: this.newMessage,
      });
      this.newMessage = "";
    },
  },
};
</script>