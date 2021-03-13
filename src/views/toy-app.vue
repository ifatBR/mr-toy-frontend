<template>
  <div class="toy-app main-container">
    <loader v-if="isLoading" />
    <!-- <loader v-if="true" /> -->
    <div v-else>
      <toy-list :toys="toys" @remove="remove">
        <toy-filter />
      </toy-list>
      <div class="btn-container flex column align-center">
        <router-link v-if="isAdmin" class="btn add confirm" to="/edit">{{
          $t("message.add-toy")
        }}</router-link>
        <div class="flex">
          <button @click="changePage(-1)" class="btn prev">
            {{ $t("message.prev") }}
          </button>
          <button @click="changePage(1)" class="btn next">
            {{ $t("message.next") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import toyList from "@/cmps/toy-list.vue";
import loader from "@/cmps/loader.vue";
import toyFilter from "@/cmps/toy-filter.vue";
import userMsg from "@/cmps/user-msg.vue";
import { showMsg } from "../services/eventBus.service.js";

export default {
  name: "toyApp",

  methods: {
    async remove(toyId) {
      await this.$store.dispatch({ type: "removeToy", toyId });
      showMsg("Toy removed");
    },
    changePage(diff) {
      const filterBy = { ...this.$store.getters.filterBy };
      filterBy.pageDiff = diff;
      this.$store.dispatch({ type: "setFilter", filterBy });
    },
  },
  computed: {
    toys() {
      return this.$store.getters.toysToShow;
    },
    isLoading() {
      return this.$store.getters.isLoading;
    },
    isAdmin() {
      return this.$store.getters.isAdmin;
    },
  },
  components: {
    toyList,
    loader,
    toyFilter,
    userMsg,
  },
};
</script>
