<template>
  <v-data-table
    :headers="tableHeader"
    :items="tableData"
    :loading="isTableLoading"
    class="elevation-1"
  >
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">
        mdi-pencil
      </v-icon>
      <v-icon small @click="deleteItem(item)">
        mdi-delete
      </v-icon>
    </template>
  </v-data-table>
</template>
<script>
export default {
  props: {
    tableHeader: {
      type: Array,
      default: function() {
        return [];
      },
    },
    tableData: {
      type: Array,
      default: function() {
        return [];
      },
    },
    isTableLoading: {
      type: Boolean,
      default: false,
    },
  },
  methods: {},
  name: "Table",
};
</script>
