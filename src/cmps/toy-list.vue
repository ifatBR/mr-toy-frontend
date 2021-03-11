
<template>
  <main>
    <slot></slot>
    <ul class="toy-list preview-grid clean-list">
      <li v-for="toy in toys" :key="toy._id" >
        <toy-preview :toy="toy" @remove="remove"/>
      </li>
    </ul>
  </main>
</template>

<script>
import toyPreview from "@/cmps/toy-preview.vue";
export default {
  name: "toyList",
  props: {
    toys: Array,
  },
  methods:{
    remove(toyId){
      this.$emit('remove',toyId);
      }
  },
  components: {
    toyPreview,
  },
};
</script>
