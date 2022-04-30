<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row>
          <v-col cols="4"><SelectTypeConnection /></v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-btn class="elevation-0" color="primary" small @click="generate">
              Generate Data
            </v-btn>
          </v-col>
          <v-col v-if="chartsWrite.length" cols="12">
            <span>
              Dependence of response time on the amount of requested data
            </span>
          </v-col>
          <v-col v-for="(chart, index) in chartsWrite" :key="index" cols="4">
            <ChartComponent :data="chart" action="generated" />
          </v-col>
        </v-row>

        <v-row v-if="chartsWrite.length">
          <v-col cols="12">
            <v-btn class="elevation-0" color="success" small @click="getData">
              Get data
            </v-btn>
          </v-col>
          <v-col cols="4" v-if="Object.values(chartRead).length">
            <ChartComponent :data="chartRead" action="read" />
          </v-col>
        </v-row>
        <v-row v-if="chartsWrite.length">
          <v-col cols="6">
            <TableComponent />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapState, mapActions } from "vuex";
import ChartComponent from "./components/ChartComponent";
import SelectTypeConnection from "./components/SelectTypeConnection.vue";
import TableComponent from "./components/TableComponent";

export default {
  name: "App",

  components: {
    ChartComponent,
    TableComponent,
    SelectTypeConnection,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      chartsWrite: (state) => state.chartsWrite,
      chartRead: (state) => state.chartRead,
    }),
  },
  methods: {
    ...mapActions({
      generateStudents: "generateStudents",
      getStudents: "getStudents",
    }),
    generate() {
      this.generateStudents();
    },
    getData() {
      this.getStudents();
    },
  },
};
</script>
