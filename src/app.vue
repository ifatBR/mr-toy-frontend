<template>
  <div id="app" >
    <nav>
      <div class="flex align-center">
        <h2>Hello {{ username }}</h2>
      </div>
      <div class="links-container flex align-center justify-center" :style="direction">
        <router-link to="/toy">{{ $t("message.toys") }}</router-link> |
        <router-link to="/dashboard">{{ $t("message.dashboard") }}</router-link>
        |
        <router-link to="/branches">{{ $t("message.branches") }}</router-link
        >|
        <router-link to="/login">{{ $t("message.login") }}</router-link>
      </div>
      <div class="ctrls-container flex align-center">
        <button @click="logout" class="logout">
          {{ $t("message.logout") }}
        </button>
        <div class="lang-container">
          <select v-model="lang" @change="setLang" class="select-lang">
            <option value="he">עברית</option>
            <option value="en">English</option>
          </select>
        </div>
      </div>
    </nav>
    <router-view />
    <user-msg />
  </div>
</template>

<script>
import userMsg from "@/cmps/user-msg.vue";
export default {
  data() {
    return {
      lang: this.$store.getters.lang,
    };
  },
  created() {
    this.$store.dispatch({ type: "loadToys" });
  },
  methods: {
    setLang() {
      this.$store.commit({ type: "setLang", lang: this.lang });
    },
    async logout() {
      try {
        await this.$store.dispatch({ type: "logout" });
        this.$router.push('/')
      } catch (err) {
        userMsg("Can't logout, try again alter");
      }
    },
  },
  components: {
    userMsg,
  },
  computed: {
    username() {
      return this.$store.getters.username;
    },
    direction() {
      return this.$store.getters.direction;
    },
  },
};
</script>

