<script>
import { Doughnut } from "vue-chartjs";

export default {
  extends: Doughnut,
  props: {
    toys: Array,
  },
  data() {
    return {
      inventoryMap: {},
    };
  },
  created() {
    this.inventoryMap = this.toys.reduce((inventoryMap, toy) => {
      if (!inventoryMap[toy.type]) inventoryMap[toy.type] = 0;
      if(toy.inStock) inventoryMap[toy.type]++;

      return inventoryMap;
    }, {});
  },
  computed: {
    labels() {
      return Object.keys(this.inventoryMap)
    },
    inventory(){
        return this.labels.map(label => +(this.inventoryMap[label] / this.toys.length *100).toFixed(2))
    }
  },
  mounted() {
    this.renderChart(
      {
        labels: this.labels,
        datasets: [
          {
            label: "Data One",
            backgroundColor:  ["#f87979", "#6a9eb6", "#373476","#b3aaa4", "#e6f4f4"],
            data: this.inventory,
          },
        ],
      },
      { responsive: true, maintainAspectRatio: false }
    );
  },
};
</script>