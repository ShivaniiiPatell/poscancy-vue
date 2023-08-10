<template>
  <v-app>
    <v-navigation-drawer app v-if="!isSignInPage">
      <v-list>
        <v-list-item>
          <router-link to="/" class="d-flex align-center">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="text-primary">Home</v-list-item-title>
            </v-list-item-content>
          </router-link>
        </v-list-item>

        <v-list-item>
          <router-link to="/about" class="d-flex align-center">
            <v-list-item-icon>
              <v-icon>mdi-information</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="text-primary">About</v-list-item-title>
            </v-list-item-content>
          </router-link>
        </v-list-item>

        <v-list-item>
          <router-link to="/user" class="d-flex align-center">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="text-primary">User</v-list-item-title>
            </v-list-item-content>
          </router-link>
        </v-list-item>

        <v-list-item>
          <router-link to="/event" class="d-flex align-center">
            <v-list-item-icon>
              <v-icon>mdi-calendar</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="text-primary">Event</v-list-item-title>
            </v-list-item-content>
          </router-link>
        </v-list-item>

        <v-list-item>
          <router-link to="/channel" class="d-flex align-center">
            <v-list-item-icon>
              <v-icon>mdi-message</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="text-primary"
                >Channel</v-list-item-title
              >
            </v-list-item-content>
          </router-link>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app dark color="primary">
      <v-toolbar-title>Poscancy</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text v-if="!isSignInPage" @click="logout">Logout</v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      // items: [
      //   { title: "Home", icon: "mdi-home" },
      //   { title: "User", icon: "mdi-information" },
      //   { title: "About", icon: "mdi-information" },
      //   // Add more items as needed
      // ],
    };
  },
  computed: {
    isSignInPage() {
      return this.$route.name === "SignIn";
    },
  },
  methods: {
    // redirectToHome() {
    //   this.$router.push({ name: "Home" });
    // },
    // redirectToAbout() {
    //   this.$router.push({ name: "About" });
    // },
    ...mapMutations("auth", ["LOGOUT"]),
    logout() {
      this.LOGOUT();
      this.$router.push({ name: "SignIn" });
    },
  },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
