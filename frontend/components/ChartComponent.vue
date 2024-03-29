<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="6" md="4" lg="2">
        <v-select
          v-model="selectedOption"
          :items="selectOptions"
          label="Select the chart data"
          @change="updateChartData"
        ></v-select>
      </v-col>
      <v-col cols="12" sm="6" md="4" lg="1">
        <v-select
          v-model="selectedDateOption"
          :items="dateOptions"
          label="Select the date to use"
          @change="updateChartData"
        ></v-select>
      </v-col>
      <v-col cols="12" sm="6" md="4" lg="1">
        <v-select
          v-model="selectedYear"
          :items="yearOptions"
          label="Year"
          @change="updateChartData"
        ></v-select>
      </v-col>
      <v-col cols="12" sm="6" md="4" lg="1">
        <v-select
          v-model="selectedStatus"
          :items="statusOptions"
          label="Status"
          @change="updateChartData"
        ></v-select>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" sm="10" md="10" lg="8">
        <Bar
          ref="barChart"
          :chart-options="chartOptions"
          :chart-data="chartData"
          :chart-id="chartId"
          :dataset-id-key="datasetIdKey"
          :plugins="plugins"
          :css-classes="cssClasses"
          :styles="styles"
          :width="width"
          :height="height"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { Bar } from "vue-chartjs";

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
  LinearScale,
);

export default {
  name: "BarChart",
  components: {
    Bar,
  },
  props: {
    selectOptions: {
      type: Array,
      default: () => [
        { text: "Number of subscriptions per month", value: "1" },
        { text: "Number of charges per month", value: "2" },
        { text: "Value per month", value: "3" },
      ],
    },
    dateOptions: {
      type: Array,
      default: () => [
        { text: "Start Date", value: "1" },
        { text: "Status date", value: "2" },
        { text: "Cancel Date", value: "3" },
        { text: "Next Cycle", value: "4" },
      ],
    },
    statusOptions: {
      type: Array,
      default: () => [
        { text: "Any", value: "0" },
        { text: "ACTIVE", value: "1" },
        { text: "CANCELED", value: "2" },
        { text: "DEMO_CANCELED", value: "3" },
      ],
    },
    chartData: {
      type: Object,
      required: true,
    },
    chartOptions: {
      type: Object,
      required: true,
    },
    chartId: {
      type: String,
      default: "bar-chart",
    },
    datasetIdKey: {
      type: String,
      default: "label",
    },
    width: {
      type: Number,
      default: 400,
    },
    height: {
      type: Number,
      default: 400,
    },
    cssClasses: {
      default: "",
      type: String,
    },
    styles: {
      type: Object,
      default: () => {},
    },
    plugins: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      selectedOption: "1",
      selectedYear: "All",
      selectedStatus: "0",
      selectedDateOption: "1",
    };
  },
  computed: {
    yearOptions() {
      const currentYear = new Date().getFullYear();
      const years = ["All"];
      for (let year = currentYear; year >= 2010; year--) {
        years.push({ text: year.toString(), value: year.toString() });
      }
      return years;
    },
  },
  methods: {
    async updateChartData() {
      let endpoint = "";
      // Inscrições por mês
      if (this.selectedOption == 1) {
        endpoint = "subscriptions-per-month";
      }
      // Período de cobranças por mês
      else if (this.selectedOption == 2) {
        endpoint = "charges-per-month";
      } else if (this.selectedOption == 3) {
        endpoint = "value-per-month";
      }

      // Filtro de ano
      let filter = "";
      if (this.selectedYear != "All") {
        filter = "?year=" + this.selectedYear;
      }

      // Filtro de status
      if (this.selectedStatus != 0) {
        if (filter != "") {
          filter = filter + "&";
        } else {
          filter = filter + "?";
        }
        filter = filter + "status=" + this.selectedStatus;
      }

      // Filtro de tipo de data
      if (this.selectedDateOption != 1) {
        if (filter != "") {
          filter = filter + "&";
        } else {
          filter = filter + "?";
        }
        filter = filter + "date_filter=" + this.selectedDateOption;
      }

      // Realiza requisição para API para atualizar dados
      try {
        const response = await this.$axios.get(
          process.env.apiUrl + "/subscriptions/" + endpoint + filter,
        );

        const newData = response.data;
        let label = "Subscriptions";
        if (this.selectedOption == 2) {
          label = "Charges";
        } else if (this.selectedOption == 3) {
          label = "Value in BRL";
        }
        this.$emit("update-chart-data", newData, label);
      } catch (error) {
        console.error("Error on fetching data:", error);
      }
    },
  },
};
</script>
