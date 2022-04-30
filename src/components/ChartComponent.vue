<template>
  <div>
    <Bar
      :chart-options="chartOptions"
      :chart-data="chartData"
      :width="width"
      :height="height"
    />
    <div>
      Time for {{ action }} {{ lastNumOfData }} elements is
      {{ lastNumOfTimes }} s.
    </div>
  </div>
</template>
<script>
import { Bar } from "vue-chartjs/legacy";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

export default {
  props: {
    data: {
      type: Object,
      default: () => {},
    },
    action: {
      type: String,
      default: "",
    },
  },
  components: { Bar },
  data() {
    return {
      width: 50,
      height: 40,
      chartOptions: {
        responsive: true,
        scale: {
          ticks: {
            precision: 4,
          },
        },
      },
    };
  },
  computed: {
    lastNumOfData() {
      return this.data.nums_of_data[this.data.nums_of_data.length - 1];
    },
    lastNumOfTimes() {
      return (
        Math.round(this.data.times[this.data.times.length - 1] * 10000) / 10000
      );
    },
    chartData() {
      return {
        labels: this.data.nums_of_data,
        datasets: [
          {
            data: this.data.times,
            label: this.data.title,
            backgroundColor: "#DCEDC8",
          },
        ],
      };
    },
  },
};
</script>