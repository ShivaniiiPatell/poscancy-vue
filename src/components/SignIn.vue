<template>
  <v-container>
    <v-card outlined class="mx-auto" max-width="350">
      <v-card-title class="text-center">Sign In</v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field v-model="email" label="Email" outlined></v-text-field>
          <v-text-field
            v-model="password"
            label="Password"
            type="password"
            outlined
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" block @click="handleSignUp">Sign In</v-btn>
      </v-card-actions>

      <div class="line"></div>
      <!-- <div class="pb-20 mb-4">
       
        <v-btn
          color="primary"
          text
          class="google-button px-20"
          @click="loginWithGoogle"
        >
          <img src="#" class="google-img" />
          <span>SignIn with Google</span>
        </v-btn>
      </div> -->
    </v-card>
    <!-- Vuetify alert to show login errors -->
    <v-alert
      v-if="loginError"
      type="error"
      dismissible
      @click:close="clearLoginError"
    >
      {{ loginError }}
    </v-alert>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "LogIn",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  computed: {
    ...mapGetters("auth", ["isAuthenticated", "loginError"]),
  },
  methods: {
    ...mapActions("auth", ["signIn"]),
    async handleSignUp() {
      console.log("Sign Up:", this.email, this.password);
      await this.signIn({
        email: this.email,
        password: this.password,
      });
      console.log("isAuthenticated", this.isAuthenticated);

      if (this.isAuthenticated) {
        console.log("routing-----");
        this.$router.push({ name: "Home" });
      }
    },
    clearLoginError() {
      this.$store.commit("auth/SET_LOGIN_ERROR", null);
    },
  },
};
</script>

<style scoped>
/* Your scoped styles */
</style>

<style scoped>
.line {
  position: relative;
  height: 1px;
  width: 100%;
  margin: 36px 0;
  background-color: #d4d4d4;
}
.line::before {
  content: "Or";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  color: #8b8b8b;
  padding: 0 15px;
}
</style>
