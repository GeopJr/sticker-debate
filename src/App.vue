<template>
  <div class="page-container">
    <md-app md-mode="overlap">
      <md-app-toolbar class="md-primary md-large">
        <Header @toggleDrawer="toggleDrawer" />
      </md-app-toolbar>
      <md-app-drawer :md-active.sync="menuVisible">
        <Drawer />
      </md-app-drawer>
      <md-app-content :class="this.clear ? 'c-clear' : ''">
        <router-view @clear="clean" />
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
import Header from "@/components/layout/header.vue";
import Drawer from "@/components/layout/drawer.vue";

export default {
  name: "Entry",
  components: {
    Header,
    Drawer
  },
  data: () => ({
    menuVisible: false,
    clear: false
  }),
  methods: {
    toggleDrawer() {
      this.menuVisible = !this.menuVisible;
    },
    clean() {
      this.clear = true;
    }
  },
  watch: {
    $route() {
      if (this.$route.path !== "/") {
        this.clear = false;
      }
    }
  }
};
</script>

<style lang="less">
:root {
  --md-theme-default-primary: #7f77bc !important;
  --md-theme-default-accent: #a56262 !important;
  --md-theme-default-accent-on-background: #a56262 !important;
  --md-theme-default-background-variant: #262329 !important;
  --md-theme-default-background: lighten(#262329, 5%) !important;
  --md-theme-default-primary-on-background: #f0db78 !important;
}

.md-app {
  height: 100vh;
  border: 1px solid rgba(#000, 0.12);
}

.page-container {
  height: 100vh;
}

.c-clear {
  background-color: #00000000 !important;
  box-shadow: none !important;
  padding-top: 0px !important;
}

.md-toolbar {
  top: 0px !important;
  min-height: 120px !important;
}

.c-btn {
  display: inline-block;
  float: left;
}
</style>
