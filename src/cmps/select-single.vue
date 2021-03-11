<template>
  <el-select v-model="value" @change="setFilterParam" placeholder="Choose option">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    >
    </el-option>
  </el-select>
</template>

<script>
export default {
  props: {
    currOptions: Array,
    param: String,
    filterVal:[String, Number, Boolean]
  },
  created() {
    this.options = this.currOptions;
    this.value = this.filterVal
  },
  data() {
    return {
      options: null,
      value: "",
    };
  },
  methods:{
    setFilterParam(){
      this.$emit('setFilterParam', {param:this.param, val:this.value})
    }
  }
};
</script>