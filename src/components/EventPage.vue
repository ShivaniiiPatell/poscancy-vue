<template>
  <div>
    <v-sheet tile class="d-flex mt-100">
      <v-btn icon class="ma-2" @click="addEventDialog = true">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <v-btn icon class="ma-2" @click="$refs.calendar.prev()">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-select
        v-model="type"
        :items="types"
        dense
        variant="outlined"
        hide-details
        class="ma-2"
        label="type"
      ></v-select>
      <v-select
        v-model="mode"
        :items="modes"
        dense
        variant="outlined"
        hide-details
        label="event-overlap-mode"
        class="ma-2"
      ></v-select>
      <v-select
        v-model="weekday"
        :items="weekdays"
        dense
        variant="outlined"
        hide-details
        label="weekdays"
        class="ma-2"
      ></v-select>
      <v-spacer></v-spacer>
      <v-btn icon class="ma-2" @click="$refs.calendar.next()">
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
    </v-sheet>
    <v-sheet height="600">
      <v-calendar
        ref="calendar"
        v-model="value"
        :weekdays="weekday"
        :type="type"
        :events="events"
        :event-overlap-mode="mode"
        :event-overlap-threshold="30"
        :event-color="getEventColor"
        @change="getEvents"
      ></v-calendar>
    </v-sheet>
    <v-sheet>
      <v-data-table
        :headers="tableHeaders"
        :items="events"
        :items-per-page="5"
        class="elevation-1 ma-2"
      >
        <template v-slot:item="{ item }">
          <tr>
            <td>{{ item.name }}</td>
            <td>{{ item.start }}</td>
            <td>{{ item.end }}</td>
            <td>
              <router-link :to="`/event/${item._id}`">
                <v-btn
                  @click="viewEventDetails(item)"
                  color="primary"
                  x-small
                  class="mr-2"
                >
                  View Details
                </v-btn>
              </router-link>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-sheet>
    <v-dialog v-model="addEventDialog" max-width="600">
      <v-card>
        <v-card-title>Add New Event</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="newEvent.title"
            label="Event Title"
            required
          ></v-text-field>
          <v-text-field
            v-model="newEvent.description"
            label="Event Description"
            required
          ></v-text-field>
          <v-date-picker
            v-model="newEvent.start"
            label="Start Date"
            required
          ></v-date-picker>
          <v-date-picker
            v-model="newEvent.end"
            label="End Date"
            required
          ></v-date-picker>
          <!-- Add more fields for event description, etc. as needed -->
        </v-card-text>
        <v-card-actions>
          <v-btn @click="closeAddEventDialog">Cancel</v-btn>
          <v-btn @click="saveNewEvent">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "EventPage",
  data: () => ({
    addEventDialog: false,
    newEvent: {
      title: "",
      start: null,
      end: null,
      description: "",
      // Add more properties for event description, etc. as needed
    },
    type: "month",
    types: ["month", "week", "day", "4day"],
    mode: "stack",
    modes: ["stack", "column"],
    weekday: [0, 1, 2, 3, 4, 5, 6],
    weekdays: [
      { text: "Sun - Sat", value: [0, 1, 2, 3, 4, 5, 6] },
      { text: "Mon - Sun", value: [1, 2, 3, 4, 5, 6, 0] },
      { text: "Mon - Fri", value: [1, 2, 3, 4, 5] },
      { text: "Mon, Wed, Fri", value: [1, 3, 5] },
    ],
    value: "",
    events: [],
    colors: [
      "blue",
      "indigo",
      "deep-purple",
      "cyan",
      "green",
      "orange",
      "grey darken-1",
    ],
    names: [
      "Meeting",
      "Holiday",
      "PTO",
      "Travel",
      "Event",
      "Birthday",
      "Conference",
      "Party",
    ],
    tableHeaders: [
      { text: "Event Name", value: "title", align: "center", width: "120px" },
      { text: "Start Date", value: "start", align: "center", width: "120px" },
      { text: "End Date", value: "end", align: "center", width: "120px" },
      {
        text: "Actions",
        value: "actions",
        sortable: false,
        align: "center",
        width: "120px",
      },
    ],
  }),
  computed: {
    ...mapGetters("events", ["allEvents"]), // Use "events" namespace for the events store module
  },
  methods: {
    ...mapActions("events", ["fetchAllEvents", "addEvent"]),
    /* eslint-disable no-unused-vars */
    async getEvents({ start, end }) {
      const events = [];
      await this.fetchAllEvents();
      console.log("all events", this.allEvents);

      let eventData;
      for (let i = 0; i < this.allEvents.length; i++) {
        eventData = this.allEvents[i];
        events.push({
          name: eventData["title"],
          start: new Date(eventData["start"]),
          end: new Date(eventData["end"]),
          _id: eventData["_id"],
          color: this.colors[this.rnd(0, this.colors.length - 1)],
          timed: true,
        });
      }

      this.events = events;
    },
    getEventColor(event) {
      return event.color;
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a;
    },
    openAddEventDialog() {
      this.addEventDialog = true;
    },

    // Close the "Add Event" dialog
    closeAddEventDialog() {
      // Reset the newEvent object to clear the input fields
      this.newEvent = {
        title: "",
        start: null,
        end: null,
        // Reset other properties for event description, etc. as needed
      };
      this.addEventDialog = false;
    },

    saveNewEvent() {
      this.addEvent(this.newEvent);
      this.closeAddEventDialog();
    },
  },
};
</script>