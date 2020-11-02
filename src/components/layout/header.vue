<template>
  <div class="c-header">
    <div class="md-toolbar-row">
      <md-button
        class="md-icon-button md-raised md-primary"
        @click="toggleDrawer"
      >
        <md-icon>menu</md-icon>
      </md-button>
      <span class="md-title">Sticker Debate</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  methods: {
    toggleDrawer() {
      this.$emit("toggleDrawer");
    }
  }
};
</script>
