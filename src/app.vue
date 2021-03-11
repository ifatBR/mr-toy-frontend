<template>
  <div id="app">
    <nav class="flex align-center">
      <div class="links-container">
        <router-link to="/">{{ $t("message.toys") }}</router-link> |
        <router-link to="/dashboard">{{ $t("message.dashboard") }}</router-link>
        |
        <router-link to="/branches">{{ $t("message.branches") }}</router-link>
        <router-link to="/login">login</router-link>
      </div>
      <div class="lang-container">
        <select v-model="lang" @change="setLang" class="select-lang">
          <option value="he">עברית</option>
          <option value="en">English</option>
        </select>
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
  },
  components: {
    userMsg,
  },
};
</script>

