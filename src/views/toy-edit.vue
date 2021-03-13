<template>
  <form
    v-if="toyToEdit"
    @submit.prevent="save"
    class="toy-edit"
    :style="direction"
  >
    <div class="edit-input">
      <label>{{ $t("message.toy-name") }}: </label
      ><input type="text" v-model="toyToEdit.name" required/>
      <label>{{ $t("message.price") }} ({{$t("message.priceSymb")}}): </label
      ><input type="number" min="0" v-model.number="price" value="formattedPrice" required/>
      <label>{{ $t("message.type") }}:</label>
      <select v-model="toyToEdit.type" required>
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
      <button class="btn save confirm">{{ $t("message.save") }}</button>
      <router-link to="/toy" class="btn back">{{
        $t("message.back")
      }}</router-link>
    </div>
  </form>
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
      price: null,
    };
  },
  created() {
    const toyId = this.$route.params.toyId;
    if (toyId) {
      toyService.getById(toyId).then((toy) => {
        this.toyToEdit = JSON.parse(JSON.stringify(toy));
        this.price = this.formattedPrice;
      });
    }
    this.types = this.$store.getters.types;
  },
  methods: {
    save() {
      this.toyToEdit.price = this.unformattedPrice;
      this.$store
        .dispatch({ type: "saveToy", toy: this.toyToEdit })
        .then(() => {
          this.toyToEdit = toyService.getEmptyToy();
          this.$router.push("/toy");
          this.toyToEdit._id ? showMsg("Saved changes") : showMsg("Toy added");
        })
        .catch((err) => showMsg("Can't save toy", 'danger'));
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
    formattedPrice() {
      const { multiplier } = this.$store.getters.getLocale;
      return this.toyToEdit.price * multiplier;
    },
    unformattedPrice(){
      const { multiplier } = this.$store.getters.getLocale;
      return this.price / multiplier;
    }
  },
  watch: {
    "$store.getters.lang"() {
      this.price = this.formattedPrice;
    },
  },
  components: {
    validate,
  },
};
</script>
