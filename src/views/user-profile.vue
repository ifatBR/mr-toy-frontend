<template>
  <section class="user-profile" v-if="user">
    <h2>{{ user.username }}</h2>
    <ul class="user-reviews clean-list">
      <li v-for="review in reviews" :key="review.id">
        <h4>{{review.toy.name}}</h4>
        <review-preview :review="review"/>
      </li>
    </ul>
  </section>
</template>

<script>
import {reviewService} from '../services/review.service.js'
import reviewPreview from '@/cmps/review-preview.vue'
export default {
  data() {
    return {
      reviews:null
    };
  },
  created() {
    if (!this.user) return this.$router.push("/login");
    this.setReviews();
  },
  methods: {
    async setReviews() {
      this.reviews = await reviewService.query({ userId: this.user._id });
    },
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
  },
  components:{
    reviewPreview
  }
};
</script>
