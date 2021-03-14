      
<template>
  <section>
    <ul class="user-reviews clean-list">
      <li v-for="review in reviews" :key="review.id">
        <h2>{{review.username}}</h2>
        <h4>{{ review.toy.name }}</h4>
        <review-preview :review="review" />
      </li>
    </ul>
  </section>
</template>

<script>
import { reviewService } from "../services/review.service.js";
import reviewPreview from '@/cmps/review-preview.vue'

export default {
  data() {
    return {
      reviews: null,
    };
  },
  created() {
    console.log("created");
    this.setReviews();
  },
  methods: {
    async setReviews() {
      this.reviews = await reviewService.query();
      console.log(this.reviews);
    },
  },
  components:{
    reviewPreview
  }
};
</script>