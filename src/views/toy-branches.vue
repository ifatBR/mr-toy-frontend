
<template>
  <section>
      <h2 class="headline">Branches</h2>
    <google-map />
  </section>
</template>

<script>
import googleMap from "@/cmps/google-map.vue";

export default {
  name: "toyBranches",
  components: {
    googleMap,
  },
};
</script>
