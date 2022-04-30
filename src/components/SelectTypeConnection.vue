<template>
  <v-select
    v-model="selectedItem"
    :items="items"
    item-text="name"
    item-value="value"
    :menu-props="menuProps"
    outlined
    dense
    hide-details
    color="primary"
    @change="updateSelectedConnection"
  ></v-select>
</template>
<script>
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      menuProps: {
        bottom: true,
        offsetY: true,
        whiteSpace: "normal",
      },
      selectedItem: "local",
      items: [
        { id: 0, name: "Локальное подключение к БД", value: "local" },
        {
          id: 1,
          name: "Подключение с помощью Docker",
          value: "container_local",
        },
        { id: 2, name: "Интеграция с облачной БД", value: "cloud" },
      ],
    };
  },
  methods: {
    ...mapMutations({
      updateParams: "UPDATE_PARAMS",
    }),
    updateSelectedConnection(value) {
      this.updateParams({ database_connection: value });
    },
    init() {
      this.updateParams({ database_connection: this.selectedItem });
    },
  },
  mounted() {
    this.init();
  },
};
</script>