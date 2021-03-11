<template>
  <section class="select-multiple">
    <el-select
      @change="setFilterParam"
      v-model="value1"
      multiple
      placeholder="Multiple options"
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
  </section>
</template>

<script>
export default {
  props: {
    filterTypes: Array,
    types: Array,
    param:String
  },
  data() {
    return {
      options: null,
      value1: [],
    };
  },
  created() {
    this.options = this.types.map((type) => {
      return { value: type, label: type };
    });
    this.value1 = this.filterTypes
  },
  methods: {
    setFilterParam() {
      this.$emit("setFilterParam", {param:this.param, val:this.value1});
    },
  },
};
</script>