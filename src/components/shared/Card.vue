<template>
  <div class="d-flex justify-center mb-6">
    <v-card elevation="0" width="450" color="rgb(255, 0, 0, -0.8)">
      <v-card-title class="d-flex justify-center mb-6">
        <slot name="title"></slot>
      </v-card-title>
      <v-card-text>
        <slot name="body"></slot>
      </v-card-text>
      <v-card-actions class="d-flex justify-center mb-6 footer-global">
        <slot name="footer"></slot>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "Card",
  components: {},
};
</script>
