
<template>
  <label>
      <input class="apple-switch" type="checkbox" @click="toggle" :checked="isOn"/>
      <div></div>
  </label>
</template>

<script>

export default {
  name: "toggleButton",
  data() {
    return {
        isOn:this.value
    };
  },
  methods: {
    toggle() {
        this.isOn = !this.isOn;
        this.$emit('input',this.isOn);
    },
  },
};
</script>
