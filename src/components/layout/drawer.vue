<template>
  <div class="c-drawer">
    <md-toolbar class="md-transparent" md-elevation="0">
      Navigation
    </md-toolbar>

    <md-list>
      <md-list-item>
        <md-icon>home</md-icon>
        <span class="md-list-item-text"
          ><md-button class="md-accent" @click="$router.push('/')">
            <router-link to="/">Home</router-link>
          </md-button>
        </span>
      </md-list-item>

      <md-list-item>
        <md-icon>info</md-icon>
        <span class="md-list-item-text">
          <md-button class="md-accent" @click="$router.push('about')">
            <router-link to="/about">About</router-link>
          </md-button>
        </span>
      </md-list-item>

      <md-list-item>
        <md-icon>account_circle</md-icon>
        <span class="md-list-item-text"
          ><div v-if="!$auth.loading">
            <md-button
              class="md-accent c-btn"
              v-if="!$auth.isAuthenticated"
              @click="login"
              >Log in</md-button
            >
            <md-button
              class="md-accent c-btn"
              v-if="$auth.isAuthenticated"
              @click="logout"
            >
              Log out
            </md-button>
          </div></span
        >
      </md-list-item>
    </md-list>
  </div>
</template>

<script>
export default {
  name: "Drawer",
  methods: {
    login() {
      this.$auth.loginWithRedirect();
    },
    logout() {
      this.$auth.logout({
        returnTo: window.location.origin
      });
    }
  }
};
</script>

<style lang="less" scoped>
.md-drawer {
  width: 230px;
  max-width: calc(100vw - 125px);
}

.c-btn {
  color: #f0db78 !important;
  &:hover {
    text-decoration: underline !important;
  }
}
</style>
