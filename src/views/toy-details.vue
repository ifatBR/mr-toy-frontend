
<template>
  <section v-if="toy" class="toy-details flex align-center">
    <div class="info-container">
      <h2>{{ toy.name }}</h2>
      <div class="details-info">
        <h3>id:</h3>
        <h4>{{ toy._id }}</h4>
        <h3>price:</h3>
        <h4>{{ toy.price }}</h4>
        <h3>type:</h3>
        <h4>{{ toy.type }}</h4>
        <h3>is in stock:</h3>
        <h4>{{ toy.inStock }}</h4>
        <h3>created at:</h3>
        <h4>{{ date }}</h4>
      </div>
      <router-link class="btn back" to="/">Back</router-link>
    </div>
    <div class="img-container">
      <img class="details-img" :src="imgSrc" />
    </div>
  </section>
</template>

<script>
import { toyService } from "../services/toy.service.js";
import { utilService } from "../services/util.service.js";

export default {
  name: "toyDetails",
  data() {
    return {
      toy: null,
    };
  },
  created() {
    const toyId = this.$route.params.toyId;
    toyService.getById(toyId).then((toy) => (this.toy = toy));
  },
  computed: {
    date() {
      return new Date(this.toy.createdAt).toLocaleDateString("he-IS");
    },
    imgSrc() {
      const num = utilService.getRandomInt(1, 17);
      return require(`@/assets/imgs/${num}.jpg`);
    },
  },
};
</script>
