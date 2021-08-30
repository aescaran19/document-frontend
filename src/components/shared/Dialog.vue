<template>
  <div class="dialog-wrapper">
    <v-row justify="center">
      <v-dialog
        style="height:100% !important"
        class="dialog-middle"
        @click:outside="closeDialog"
        :value="showDialog"
        :width="dialogWidth"
      >
        <v-card class="dialog-card">
          <v-card-title></v-card-title>
          <v-card-text>
            <slot name="dialogbody"></slot>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>
<script>
export default {
  name: "Dialog",
  props: {
    dialogWidth: {
      type: Number,
      default: 0,
    },
    showDialog: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    closeDialog() {
      this.$emit("close", false);
    },
  },
};
</script>
