<template>
  <section v-if="toyToEdit" class="toy-edit">
    <div class="edit-input">
      <label>Toy name: </label><input type="text" v-model="toyToEdit.name" />
      <label>Price: </label><input type="number" v-model="toyToEdit.price" />
      <label>Type:</label>
      <select v-model="toyToEdit.type">
        <option :value="type" v-for="type in types" :key="type + 'e'">
          {{ type }}
        </option>
      </select>

      <label>In stock:</label>
      <input
        class="switch"
        type="checkbox"
        v-model="toyToEdit.inStock"
        :checked="isInStock"
      />
    </div>
    <div class="btn-edit flex column align-center justify-center">
      <!-- <validate/> -->
      <button @click="save" class="btn save confirm">save</button>
      <router-link to="/" class="btn back">Back</router-link>
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
  },
  components: {
    validate,
  },
};
</script>
