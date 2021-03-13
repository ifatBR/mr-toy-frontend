
<template>
  <section
    v-if="toy"
    class="toy-details main-container flex align-center space-evenly"
    :style="direction"
  >
    <div class="info-container flex column space-between">
      <h2>{{ toy.name }}</h2>
      <div class="details-info">
        <!-- <h3>id:</h3>
        <h4>{{ toy._id }}</h4> -->
        <h3>{{ $t("message.price") }}</h3>
        <h4>{{ formattedPrice }}</h4>
        <h3>{{ $t("message.type") }}:</h3>
        <h4>{{ toy.type }}</h4>
        <h3>{{ $t("message.in-stock") }}:</h3>
        <h4>{{ toy.inStock }}</h4>
        <h3>{{ $t("message.created-at") }}:</h3>
        <h4>{{ date }}</h4>
      </div>
      <div class="flex space-between align-center">
        <router-link class="btn back" to="/toy">{{
          $t("message.back")
        }}</router-link>
        <button @click="addReview" class="btn confirm">{{ $t("message.add-review") }}</button>
      </div>
    </div>
    <div class="img-container">
      <img class="details-img" :src="imgSrc" />
    </div>
    <review-accordion class="review-accordion" :reviews="toy.reviews" />
  </section>
</template>

<script>
import { toyService } from "../services/toy.service.js";
import { utilService } from "../services/util.service.js";
import reviewAccordion from "@/cmps/review-accordion.vue";
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
  methods: {
    addReview() {
      this.$router.push("/details/review/" + this.toy._id);
    },
  },
  computed: {
    date() {
      return new Date(this.toy.createdAt).toLocaleDateString("he-IS");
    },
    imgSrc() {
      return require(`@/assets/imgs/${this.toy.url}`);

      // const num = utilService.getRandomInt(1, 17);
      // return require(`@/assets/imgs/${num}.jpg`);
    },
    direction() {
      return this.$store.getters.direction;
    },
    formattedPrice() {
      const { locale, currency, multiplier } = this.$store.getters.getLocale;
      const price = this.toy.price * multiplier;
      return (
        "locale", price.toLocaleString(locale, { style: "currency", currency })
      );
    },
  },
  components: {
    reviewAccordion,
  },
};
</script>
