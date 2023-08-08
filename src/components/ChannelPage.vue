<template>
  <div>
    {{ allChannels }}
    <v-data-table :items="allChannels" :headers="headers" class="elevation-1">
      <template v-slot:item="{ item }">
        <tr>
          <td>{{ item.title }}</td>
          <td>{{ item.description }}</td>
          <td>{{ item.start }}</td>
          <td>{{ item.end }}</td>
          <td>
            <router-link :to="`/channel/${Number(item.id)}`" class="mr-2">
              <v-btn color="primary" x-small> View Details </v-btn>
            </router-link>
          </td>
        </tr>
      </template>
    </v-data-table>
    <v-form ref="eventForm">
      <v-row>
        <v-col cols="6" class="pl-20">
          <v-text-field v-model="newChannel.title" label="Title"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6" class="ml-200">
          <v-textarea
            v-model="newChannel.description"
            label="Description"
          ></v-textarea>
        </v-col>
      </v-row>
      <v-btn @click="handleAddChannel" color="primary" class="mb-5"
        >Add Channel</v-btn
      >
    </v-form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      headers: [
        { text: "ID", value: "id" },
        { text: "Title", value: "title" },
        { text: "Description", value: "description" },
        { text: "Action", value: "action", sortable: false },
      ],
      newChannel: {
        title: "",
        description: "",
      },
    };
  },
  computed: {
    ...mapGetters("channels", ["allChannels"]),
    channels() {
      return this.allChannels;
    },
  },
  methods: {
    ...mapActions("channels", ["addChannel"]),
    handleAddChannel() {
      console.log("inside channel", this.newChannel);

      this.addChannel(this.newChannel);
      // this.newChannel = { title: "", description: "" };
      // this.$refs.eventForm.reset();
    },
  },
};
</script>
