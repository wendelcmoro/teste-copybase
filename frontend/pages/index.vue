<template>
  <v-container>
    <div>
      <FileUploadModal @file-uploaded="sendRefreshChartData" />
    </div>
    <div>
      <ChartComponent
        :chart-data="chartData"
        :chart-options="chartOptions"
        @update-chart-data="updateChartData"
        ref="barChart"
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
  props: {
    label: { type: String, default: "Value in BRL" },
  },
  async asyncData({ $axios }) {
    try {
      const response = await $axios.get(
        process.env.apiUrl + "/subscriptions/month-recurring-revenue?status=1",
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
            label: this.label,
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
            // display: false,
          },
        },
      };
    },
  },
  methods: {
    // Atualiza componente do gráfico
    async updateChartData(newData, label) {
      let aux = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      newData.forEach((element) => {
        if (element.month) {
          aux[element.month - 1] = element.count;
        }
      });
      this.data = aux;
      this.label = label;
    },
    // Sinaliza evento para atualizar dados do backend
    async sendRefreshChartData() {
      this.$refs.barChart.updateChartData();
    },
  },
};
</script>
