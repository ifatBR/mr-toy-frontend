
<template>
  <div v-if="filterBy" class="toy-filter flex justify-center" :style="direction">
    <label>{{ $t("message.name") }}:</label>

      <input type="text" v-model="filterBy.name" @input="setFilter"
    />
    <label>{{ $t("message.in-stock") }}:</label>
      <select-single :currOptions="inStockOptions" :filterVal="filterBy.inStock" param="inStock" @setFilterParam="setFilterParam"/>
      <label>{{ $t("message.sort-by") }}:</label>
        <select-single :currOptions="sortByOptions" :filterVal="filterBy.sortBy" param="sortBy" @setFilterParam="setFilterParam"/>
    <!-- <label>{{ $t("message.sort-by") }}:
      <select v-model="filterBy.sortBy" @change="setFilter">
        <option value="name">{{ $t("message.name") }}</option>
        <option value="price">{{ $t("message.price") }}</option>
      </select></label> -->
    <label class="flex align-center">{{ $t("message.type") }}:</label>
      <select-multiple
        v-if="types"
        :types="types"
        param="types"
        :filterTypes="filterBy.types"
        @setFilterParam="setFilterParam"
      />
    
  </div>
</template>

<script>
import { utilService } from "../services/util.service";
import selectMultiple from "@/cmps/select-multiple.vue";
import selectSingle from "@/cmps/select-single.vue";
export default {
  name: "toyFilter",
  data() {
    return {
      filterBy: null,
      types: null,
    };
  },
  created() {
    this.filterBy = this.$store.getters.filterBy;
    this.setFilter = utilService.debounce(this.setFilter, 1000);
    this.types = this.$store.getters.types;
    //here I can call the special function or use watch if needed like get by id
  },
  methods: {
    setFilter() {
      console.log(this.filterBy);
      this.$store.dispatch({
        type: "setFilter",
        filterBy: { ...this.filterBy },
      });
    },

    setFilterParam({param, val}){
      this.filterBy[param] = val
      this.setFilter();
    }
  },
  computed: {
    direction() {
      return this.$store.getters.direction;
    },
    inStockOptions(){
      return [
        {label:'All', value:'all'},
        {label:'Yes', value:true},
        {label:'No', value:false},
      ]
    },
    sortByOptions(){
      return [
        {label: 'Name', value: 'name'},
        {label: 'Price', value:'price'}
      ]
    }
  },
  components: {
    selectMultiple,
    selectSingle,
  },
};
</script>
