<template>
  <v-container>
    <div>
      <FileUploadModal />
    </div>
    <div>
      <ChartComponent
        :chart-data="chartData"
        :chart-options="chartOptions"
        @update-chart-data="updateChartData"
      />
    </div>
  </v-container>
</template>

<script>
import FileUploadModal from "~/components/FileUploadModal.vue";
import ChartComponent from "~/components/ChartComponent.vue";

export default {
  name: "IndexPage",
  components: {
    FileUploadModal,
    ChartComponent,
  },
  async asyncData({ $axios }) {
    try {
      const response = await $axios.get(
        process.env.apiUrl + "/subscriptions/subscriptions-per-month",
      );

      let data = response.data;
      let aux = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      data.forEach((element) => {
        if (element.month) {
          aux[element.month - 1] = element.count;
        }
      });
      data = aux;

      return { data };
    } catch (error) {
      console.error("Error on fetching data:", error);
      return { data: null };
    }
  },
  computed: {
    chartData() {
      return {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ],
        datasets: [
          {
            label: "Data",
            backgroundColor: "#f87979",
            data: this.data,
          },
        ],
      };
    },
    chartOptions() {
      return {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
      };
    },
  },
  methods: {
    // Atualiza componente do gráfico
    async updateChartData(newData) {
      let aux = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      newData.forEach((element) => {
        if (element.month) {
          aux[element.month - 1] = element.count;
        }
      });
      this.data = aux;
    },
  },
};
</script>
