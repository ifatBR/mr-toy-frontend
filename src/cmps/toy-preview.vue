<template>
  <section class="toy-preview" :style="direction">
    <div class="img-container">
      <img class="preview-img" :src="imgSrc" />
    </div>
    <div class="info-container flex column justify-center align-start">
      <h3>
        {{ $t("message.price") }}: <span>{{ toy.price }}</span>
      </h3>
      <h2>{{ toy.name }}</h2>

      <div class="btn-container flex space-between">
        <div>
          <router-link :to="'/details/' + toy._id" class="btn details">{{
            $t("message.details")
          }}</router-link>
          <router-link :to="'/edit/' + toy._id" class="btn edit">{{
            $t("message.edit")
          }}</router-link>
        </div>
        <button @click="remove(toy._id)" class="btn remove"></button>
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
  data() {
    return {
      // imgSrc: './imgs/1.jpg',
    };
  },
  created() {
    // const num = utilService.getRandomInt(1,21);
    // this.imgSrc = '@/assets/imgs/1.jpg'
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
      const num = utilService.getRandomInt(1, 17);
      return require(`@/assets/imgs/${num}.jpg`);
    },
  },
};
</script>
