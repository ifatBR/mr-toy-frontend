<template>
  <section class="flex column space-between">
    <div>
      <h2>{{ $t("message.reviews") }}</h2>
      <el-collapse class="review-container" v-model="activeName" accordion>
        <el-collapse-item
          v-for="(review, index) in reviewsToShow"
          :title="reviewTitle(index)"
          :key="'review' + index"
          :name="index"
        >
          <review-preview :review="review" />
        </el-collapse-item>
      </el-collapse>
    </div>
    <div class="flex space-between">
      <button :class="isFirstReview" @click="changePage(-1)">{{ $t("message.newer") }}</button>
      <button :class="isLastReview" @click="changePage(1)">{{ $t("message.older") }}</button>
    </div>
  </section>
</template>
<script>
import reviewPreview from "@/cmps/review-preview.vue";
export default {
  props: {
    reviews: Array,
  },
  data() {
    return {
      startIdx: 0,
      activeName: "1",
      pageIdx:0,
      pageSize: 3,
      reviewsToShow: null,
    };
  },
  created() {
    this.setReviewsToShow();
  },
  methods: {
    reviewTitle(idx) {
      const review = this.reviews[idx+this.startIdx];
      let reviewTitle = "";
      for (var i = 0; i < review.rating; i++) {
        reviewTitle += "★";
      }
      reviewTitle += "\t";
      reviewTitle += review.txt.substring(0, 15);
      if (review.txt.length >= 15) reviewTitle += "...";
      return reviewTitle;
    },
    setReviewsToShow() {
      this.reviewsToShow = this.reviews.slice(
        this.startIdx,
        this.startIdx + this.pageSize
      );
    },
    changePage(diff) {
      this.setStartIdx(diff, this.reviews.length);
      this.setReviewsToShow();
    },
    setStartIdx(diff, amount) {
      this.pageIdx += diff;
      const maxPageIdx =  parseInt(amount / this.pageSize)
      if(this.pageIdx > maxPageIdx || this.pageIdx <0 ) return;
      this.startIdx =  this.pageIdx * this.pageSize;
    },
  },
  computed: {
    isFirstReview() {
      return { disabled: this.startIdx === 0 };
    },
    isLastReview() {
      return { disabled: this.reviews.length === this.startIdx + this.reviewsToShow.length };
    },
  },
  components: {
    reviewPreview,
  },
};
</script>