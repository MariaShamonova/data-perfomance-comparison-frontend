<template>
  <v-card class="elevation-1">
    <v-data-table
      v-if="students.length"
      :headers="headers"
      :items="students"
    ></v-data-table>
  </v-card>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      headers: [
        { text: "Name", value: "name", sortable: false, divider: true },
        { text: "Email", value: "email", sortable: false, divider: true },
        { text: "Address", value: "address", sortable: false, divider: true },
      ],
    };
  },
  computed: {
    ...mapState({
      students: (state) => state.students,
    }),
  },
};
</script>