<template>
  <div>
    <v-sheet elevation="5" class="pa-5 mb-10">
      <!-- {{ allUsers }} -->
      <h2>Add User:</h2>
      <v-form ref="userForm">
        <v-row>
          <v-col cols="6">
            <v-text-field
              v-model="newUser.firstName"
              label="First Name"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="newUser.lastName"
              label="Last Name"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <v-text-field v-model="newUser.role" label="Role"></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field v-model="newUser.email" label="Email"></v-text-field>
          </v-col>
        </v-row>
        <v-btn @click="handleAddUser" color="primary" class="mb-5"
          >Add Single User</v-btn
        >
        <br />
        <span class="mr-10">OR</span><br />
        <input
          type="file"
          ref="csvFileInput"
          @change="handleCSVUpload"
          class="mt-5"
        />
        <v-btn @click="uploadCSV" color="primary">Upload CSV</v-btn>
      </v-form>
    </v-sheet>
    <v-sheet elevation="5" class="pa-5 mb-10">
      <h2>User Records:</h2>
      <v-data-table
        :headers="headers"
        :items="allUsers"
        item-key="id"
        class="elevation-1"
      >
        <template v-slot:item="{ item }">
          <tr>
            <td>{{ item._id }}</td>
            <td>{{ item.firstName }}</td>
            <td>{{ item.lastName }}</td>
            <td>{{ item.email }}</td>
            <td>{{ item.role }}</td>

            <td>
              <v-btn
                @click="editUser(item)"
                color="primary"
                x-small
                class="mr-2"
                >Edit</v-btn
              >
              <v-btn @click="handleDeleteUser(item)" color="error" x-small
                >Delete</v-btn
              >
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-sheet>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "UserComponent",
  data() {
    return {
      headers: [
        {
          text: "ID",
          align: "center",
          sortable: false,
          value: "_id",
          width: "80px",
        }, // Fixed width of 50px
        {
          text: "First Name",
          align: "center",
          value: "firstName",
          width: "120px",
        },
        {
          text: "Last Name",
          align: "center",
          value: "lastName",
          width: "120px",
        },
        { text: "Email", align: "center", value: "email", width: "120px" },
        {
          text: "Role",
          align: "center",
          value: "role",
          width: "100px",
        },

        { text: "Actions", align: "center", sortable: false, width: "120px" },
        // { text: "Delete", align: "center", sortable: false, width: "120px" },
      ],
      userRecords: [],
      newUser: {
        firstName: "",
        lastName: "",
        email: "",
        role: "",
      },
    };
  },
  mounted() {
    this.fetchAllUsers();
    // console.log(allUsers);
  },
  computed: {
    ...mapGetters("user", ["allUsers"]),
  },
  methods: {
    ...mapActions("user", ["fetchAllUsers", "addUser", "deleteUser"]),
    async handleAddUser() {
      const isValid = await this.$refs.userForm.validate();

      if (!isValid) {
        return;
      }

      console.log("new user----------------", this.newUser);
      await this.addUser(this.newUser);
      await this.fetchAllUsers();
      this.clearForm();
    },
    async handleDeleteUser(item) {
      console.log("Delete user:", item);
      await this.deleteUser(item._id);
      await this.fetchAllUsers();
    },
    async handleCSVUpload(event) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const csvData = reader.result;
        console.log("csvData", csvData);
        this.parseCSVData(csvData);
      };

      reader.readAsText(file);
      // Clear the file input
      event.target.value = "";
    },
    async parseCSVData(csvData) {
      const lines = csvData.split("\n");
      console.log("lines", lines);
      const headers = lines[0].split(",");
      for (let i = 1; i < lines.length - 1; i++) {
        const fields = lines[i].split(",");
        if (fields.length === headers.length) {
          const newUser = {
            id: this.userRecords.length + 1,
          };
          headers.forEach((header, index) => {
            newUser[header.trim()] = fields[index].trim();
          });
          this.userRecords.push(newUser);
        }
      }
      console.log("this.userRecords", this.userRecords);
      await this.addUser(this.userRecords);
      await this.fetchAllUsers();
    },
    uploadCSV() {
      this.$refs.csvFileInput.click();
    },
    clearForm() {
      this.newUser.firstName = "";
      this.newUser.lastName = "";
      this.newUser.email = "";
      this.newUser.role = "";
      // this.$refs.userForm.reset();
    },
    editUser(item) {
      console.log("Edit user:", item);
    },
  },
};
</script>
