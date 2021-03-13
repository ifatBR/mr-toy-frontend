<template>
  <section
    class="main-container flex column justify-center align-center"
    :style="direction"
  >
    <div v-if="loggedInUser">
      <h2>{{ loggedInUser.username }} is logged in</h2>
    </div>
    <form v-else-if="isLoginPage" @submit.prevent="loginUser" class="login">
      <label class="flex space-between"
        >{{ $t("message.username") }}:
        <input type="text" v-model="username" required
      /></label>
      <label class="flex space-between"
        >{{ $t("message.password") }}:
        <input type="password" v-model="password" required
      /></label>
      <div class="flex space-between">
        <button class="btn confirm loginOps">{{ $t("message.login") }}</button>
        <button
          type="button"
          v-if="isLoginPage"
          @click="toggleIsLoginPage"
          class="btn back loginToggle"
        >
          Dont have a user? Signup
        </button>
      </div>
    </form>

    <form v-else @submit.prevent="signupUser" class="signup">
      <label class="flex space-between"
        >{{ $t("message.fullname") }}:
        <input type="text" v-model="fullname" required />
      </label>
      <label class="flex space-between"
        >{{ $t("message.username") }}:
        <input type="text" v-model="username" required />
      </label>
      <label class="flex space-between"
        >{{ $t("message.password") }}:
        <input type="password" v-model="password" required />
      </label>
      <label class="flex space-between"
        >{{ $t("message.admin") }}?
        <input type="checkbox" v-model="isAdmin" class="switch" />
      </label>
      <div class="flex space-between">
      <button class="btn confirm loginOps">{{ $t("message.signup") }}</button>
      <button
        type="button"
        v-if="!isLoginPage"
        @click="toggleIsLoginPage"
        class="btn back loginToggle"
      >
        Already signed up? Login
      </button>
      </div>
    </form>
  </section>
</template>


<script>
import { showMsg } from "../services/eventBus.service.js";

export default {
  data() {
    return {
      isLoginPage: true,
      fullname: null,
      username: null,
      password: null,
      isAdmin: false,
      // loggedInUser:null
    };
  },
  methods: {
    async loginUser() {
      try {
        await this.$store.dispatch({
          type: "loginUser",
          username: this.username,
          password: this.password,
        });
        this.username = "";
        this.password = "";
        this.$router.push("/toy");
      } catch (err) {
        showMsg("Wrong password or username", "danger");
      }
    },
    async signupUser() {
      try {
        await this.$store.dispatch({
          type: "signupUser",
          fullname: this.fullname,
          username: this.username,
          password: this.password,
          isAdmin: this.isAdmin,
        });
        this.fullname = "";
        this.username = "";
        this.password = "";
        this.$router.push("/toy");
      } catch (err) {
        showMsg("Can't signup user", "danger");
      }
    },
    toggleIsLoginPage() {
      this.isLoginPage = !this.isLoginPage;
    },
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.user;
    },
    direction() {
      return this.$store.getters.direction;
    },
  },
};
</script>

<style>
</style>