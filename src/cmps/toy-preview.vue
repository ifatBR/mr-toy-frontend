<template>
  <section class="toy-preview" :style="direction">
    <div class="img-container">
      <img v-if="imgSrc" class="preview-img" :src="imgSrc" />
    </div>
    <div class="info-container flex column justify-center align-start">
      <h3>
        {{ $t("message.price") }}:
        <span>{{formattedPrice}}</span>
      </h3>
      <h2>{{ toy.name }}</h2>

      <div class="btn-container flex space-between">
        <router-link :to="'/details/' + toy._id" class="btn details">
          {{ $t("message.details") }}
        </router-link>
        <div v-if="isAdmin">
          <router-link :to="'/edit/' + toy._id" class="btn edit"> </router-link>
          <button @click="remove(toy._id)" class="btn remove"></button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { utilService } from "../services/util.service.js";
export default {
  name: "toyLPreview",
  props: {
    toy: Object,
  },

  methods: {
    remove(toyId) {
      this.$emit("remove", toyId);
    },
  },
  computed: {
    direction() {
      return this.$store.getters.direction;
    },
    imgSrc() {

      if(this.toy.url.includes('http'))return this.toy.url
      return require(`@/assets/imgs/${this.toy.url}`);
    },
    isAdmin() {
      return this.$store.getters.isAdmin;
    },
    formattedPrice() {
      const { locale, currency, multiplier } = this.$store.getters.getLocale;
      const price =  this.toy.price * multiplier;
      return 'locale',price.toLocaleString(locale, {style:"currency", currency})
    },
  },
};
</script>
