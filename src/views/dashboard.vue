
<template>
  <section v-if="toys.length" class="dashboard flex space-evenly">
    <div>
      <h2 class="headline">Price per type</h2>
      <price-per-type :toys="toys" />
    </div>
    <div>
      <h2 class="headline">Inventory by type</h2>
      <inventory-by-type :toys="toys" />
    </div>
  </section>
</template>

<script>
import pricePerType from "@/cmps/price-per-type.vue";
import inventoryByType from "@/cmps/inventory-by-type.vue";

export default {
  name: "dashboard",
  computed: {
    toys() {
      return this.$store.getters.allToys;
    },
  },

  components: {
    pricePerType,
    inventoryByType,
  },
};
</script>
