<template>
  <div v-if="message">
    <v-chip class="ma-2" :color="color" close @click:close="close">
      {{ message }}
    </v-chip>
  </div>
</template>
<script>
export default {
  props: {
    message: String,
    color: String
  },
  methods: {
      close() {
          this.message = null;
          this.$emit("close");
      }
  }
};
</script>
