<template>
  <div>
    <v-card>
      <v-container>
        <h2>Event Details</h2>
        <v-row>
          <v-col cols="4">
            <p><strong>Event Name:</strong> {{ event.title }}</p>
          </v-col>
          <v-col cols="4">
            <p><strong>Start Date:</strong> {{ event.start }}</p>
          </v-col>
          <v-col cols="4">
            <p><strong>End Date:</strong> {{ event.end }}</p>
          </v-col>
        </v-row>
      </v-container>
    </v-card>

    <v-card class="mt-4">
      <v-container>
        <h2>Form Fields from Event</h2>
        <v-row v-for="(field, index) in event.eventForm" :key="index">
          <v-col cols="6" md="6">
            <v-text-field
              :label="field"
              outlined
              dense
              readonly
              color="primary"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-card>

    <v-card class="mt-4">
      <v-container>
        <h2>Add Form Fields</h2>
        <v-row align="center">
          <v-col cols="12" md="4">
            <v-btn @click="addField" color="primary">Add Field</v-btn>
          </v-col>
        </v-row>

        <v-row v-for="(value, index) in textFieldValues" :key="index">
          <v-col cols="12" md="4">
            <v-text-field
              v-model="textFieldValues[index]"
              :label="`Text Field ${index + 1}`"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row align="center">
          <v-col cols="12">
            <v-btn @click="addFormFields" color="primary">Submit Form</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "EventDetails",
  data() {
    return {
      textFieldValues: [],
    };
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapGetters("events", ["getEventById"]),
    event() {
      return this.getEventById(this.id);
    },
  },
  methods: {
    ...mapActions("events", ["updateEvent"]),
    addField() {
      console.log(" this.textFieldValues", this.textFieldValues);
      this.textFieldValues.push("");
    },

    addFormFields() {
      console.log("textFieldValues:", [...this.textFieldValues]);
      const formFields = {
        eventForm: this.event.eventForm.concat(this.textFieldValues),
        eventId: this.id,
      };
      console.log("formFields", formFields);
      this.updateEvent(formFields);
      this.textFieldValues = [];
    },
  },
};
</script>
