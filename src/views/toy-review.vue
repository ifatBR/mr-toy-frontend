<template>
  <form
    v-if="toyToEdit && loggedInUser"
    @submit.prevent="save"
    class="review-edit flex column align-center"
    :style="direction"
  >
    <h2>{{ toyToEdit.name }} <span>review</span></h2>
    <div class="review-edit-input">
      <label>rating: </label>
      <!-- maybe rating stars -->
      <input
        type="number"
        min="0"
        max="5"
        v-model.number="reviewToEdit.rating"
      />
      <label>Your review:</label>
      <textarea v-model="reviewToEdit.txt" cols="50" rows="15" style="resize: none"></textarea>
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
    };
  },
  created() {
    const toyId = this.$route.params.toyId;
    toyService
      .getById(toyId)
      .then((toy) => (this.toyToEdit = JSON.parse(JSON.stringify(toy))));
  },
  methods: {
    save() {
      if (!this.reviewToEdit.txt) {
          showMsg("Review has no text", 'danger')
          return
      };
      this.reviewToEdit.createdAt = Date.now();
      this.addReviewToToy();
      this.$store
        .dispatch({
          type: "saveReview",
          toy: this.toyToEdit,
          review: this.reviewToEdit,
        })
        .then(() => {
          this.reviewToEdit = reviewService.getEmptyReview();
          this.$router.push("/details/" + this.toyToEdit._id);
          showMsg("Saved review");
        })
        .catch((err) => showMsg("Can't save toy", danger));
    },
    addReviewToToy() {
      if (!this.toyToEdit.reviews) this.toyToEdit.reviews = [];
      this.toyToEdit.reviews.push(this.reviewToEdit);
    },
  },

  computed: {
    direction() {
      return this.$store.getters.direction;
    },
    loggedInUser() {
      return true; //TODO: check if it works
      console.log(this.$store.getters.user);
      return this.$store.getters.user;
    },
  },
};
</script>
