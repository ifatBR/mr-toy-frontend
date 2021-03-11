<script>
import { Doughnut } from "vue-chartjs";

export default {
  extends: Doughnut,
  props: {
    toys: Array,
  },
  data() {
    return {
      labels: null,
      prices: null
    };
  },
  created() {
    const priceMap = this.toys
      .reduce((priceMap, toy) => {
        if (!priceMap[toy.type])
          priceMap[toy.type] = { totalSum: 0, amount: 0 };
        priceMap[toy.type].totalSum += +toy.price;
        priceMap[toy.type].amount++;
        return priceMap;
      }, {})

      this.labels = Object.keys(priceMap);
      this.prices = Object.values(priceMap).map(({ totalSum, amount }) => +(totalSum / amount).toFixed(2));
  },
  // computed: {
  //   labels() {
  //     return Object.keys(this.priceMap);
  //   },
  //   prices() {
  //     return Object.values(this.priceMap);
  //     // return this.labels
  //     // .map(
  //     //   (label) =>
  //     //     +(
  //     //       this.priceMap[label].totalSum / this.priceMap[label].amount
  //     //     ).toFixed(2)
  //     // );
  //   },
  // },
  mounted() {
    this.renderChart(
      {
        labels: this.labels,
        datasets: [
          {
            label: "Data One",
            backgroundColor: ["#f87979", "#6a9eb6", "#373476","#b3aaa4", "#e6f4f4"],
            data: this.prices,
          },
        ],
      },
      { responsive: true, maintainAspectRatio: false }
    );
  },
};
</script>