<template>
  <form
    v-if="toyToEdit && loggedInUser"
    @submit.prevent="save"
    class="review-edit flex column align-center"
    :style="direction"
  >
    <h2>{{ toyToEdit.name }} <span>review</span></h2>
    <div class="review-edit-input">
      <div class="flex">
        <label>Rating: </label>
        <ul class="review-rating clean-list flex">
          <li
            v-for="star in 5"
            @click="setRating(star)"
            :class="{ fill: star <= reviewToEdit.rating }"
            :key="'starEdit_' + star"
          ></li>
        </ul>
      </div>

      <label>Your review:</label>
      <textarea
        v-model="reviewToEdit.txt"
        cols="30"
        rows="8"
        maxlength="250"
        style="resize: none"
      ></textarea>
    </div>

    <div class="btn-review flex column align-center justify-center">
      <button class="btn save confirm">{{ $t("message.save") }}</button>
      <router-link :to="'/details/' + toyToEdit._id" class="btn back">{{
        $t("message.back")
      }}</router-link>
    </div>
  </form>
</template>

<script>
import { reviewService } from "../services/review.service.js";
import { showMsg } from "../services/eventBus.service.js";
import { toyService } from "../services/toy.service.js";

export default {
  name: "reviewEdit",
  data() {
    return {
      toyToEdit: null,
      reviewToEdit: reviewService.getEmptyReview(),
      rating: 5,
    };
  },
  created() {
    const toyId = this.$route.params.toyId;
    if (!this.$store.getters.user) {
      this.$router.push("/details/" + toyId);
      showMsg("Login to add reviews", "danger");
    }
    toyService
      .getById(toyId)
      .then((toy) => (this.toyToEdit = JSON.parse(JSON.stringify(toy))));
  },
  methods: {
    async save() {
      if (!this.reviewToEdit.txt) {
        showMsg("Review has no text", "danger");
        return;
      }

      this.reviewToEdit.createdAt = Date.now();
      this.reviewToEdit.userId = this.loggedInUser._id;
      this.reviewToEdit.username = this.loggedInUser.username;
      this.addReviewToToy();
      try {
        await this.$store.dispatch({
          type: "saveReview",
          review: this.reviewToEdit,
          toyId: this.toyToEdit._id,
        });
        const { txt, rating, createdAt } = this.reviewToEdit;
        const userReview = {
          txt,
          rating,
          createdAt,
          toyId: this.toyToEdit._id,
        };

        await this.$store.dispatch({
          type: "addReviewToUser",
          review: userReview,
        });

        this.reviewToEdit = reviewService.getEmptyReview();
        this.$router.push("/details/" + this.toyToEdit._id);
        showMsg("Saved review");
      } catch (err) {
        showMsg("Can't save review", "danger");
      }
    },
    addReviewToToy() {
      if (!this.toyToEdit.reviews) this.toyToEdit.reviews = [];
      this.toyToEdit.reviews.push(this.reviewToEdit);
    },
    setRating(rating) {
      this.reviewToEdit.rating = rating;
    },
  },

  computed: {
    direction() {
      return this.$store.getters.direction;
    },
    loggedInUser() {
      return this.$store.getters.user;
    },
  },
};
</script>

