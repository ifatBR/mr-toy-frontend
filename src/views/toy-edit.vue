<template>
  <section v-if="toyToEdit" class="toy-edit" :style="direction">
    <div class="edit-input">
      <label>{{ $t("message.toy-name") }}: </label><input type="text" v-model="toyToEdit.name" />
      <label>{{ $t("message.price") }}: </label><input type="number" v-model="toyToEdit.price" />
      <label>{{ $t("message.type") }}:</label>
      <select v-model="toyToEdit.type">
        <option :value="type" v-for="type in types" :key="type + 'e'">
          {{ type }}
        </option>
      </select>

      <label>{{ $t("message.in-stock") }}:</label>
      <input
        class="switch"
        type="checkbox"
        v-model="toyToEdit.inStock"
        :checked="isInStock"
      />
    </div>
    <div class="btn-edit flex column align-center justify-center">
      <!-- <validate/> -->
      <button @click="save" class="btn save confirm">{{
        $t("message.save")
      }}</button>
      <router-link to="/" class="btn back">{{
        $t("message.back")
      }}</router-link>
    </div>
  </section>
</template>

<script>
import { toyService } from "../services/toy.service.js";
import { showMsg } from "../services/eventBus.service.js";
import validate from "@/cmps/validate.vue";
export default {
  name: "toyEdit",
  props: {},
  data() {
    return {
      toyToEdit: toyService.getEmptyToy(),
      types: null,
    };
  },
  created() {
    const toyId = this.$route.params.toyId;
    if (toyId) {
      toyService
        .getById(toyId)
        .then((toy) => (this.toyToEdit = JSON.parse(JSON.stringify(toy))));
    }
    this.types = this.$store.getters.types;
  },
  methods: {
    save() {
      this.$store
        .dispatch({ type: "saveToy", toy: this.toyToEdit })
        .then(() => {
          this.toyToEdit = toyService.getEmptyToy();
          this.$router.push("/");
          showMsg("Saved changes");
        })
        .catch((err) => showMsg(err));
    },
  },

  computed: {
    date() {
      return new Date(this.toy.createdAt).toLocaleDateString("he-IS");
    },
    isInStock() {
      return this.toyToEdit.inStock ? true : null;
    },
    direction() {
      return this.$store.getters.direction;
    },
  },
  components: {
    validate,
  },
};
</script>
