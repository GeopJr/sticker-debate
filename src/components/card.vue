<template>
  <md-card>
    <md-card-header>
      <div class="md-title">{{ sticker.name }}</div>
      <div class="md-subhead c-marg">{{ sticker.franchise.toUpperCase() }}</div>
      <md-chip md-clickable>{{ "#" + this.sticker.id }}</md-chip>
      <md-chip :class="'md-accent'" md-clickable>{{
        "Votes: " + this.sticker.votes
      }}</md-chip>
      <md-chip
        :class="this.sticker.limited ? 'md-primary' : null"
        md-clickable
        >{{ (this.sticker.limited ? "" : "Not ") + "Limited" }}</md-chip
      >
      <md-chip md-clickable>{{ "Amount: " + this.sticker.amount }}</md-chip>
    </md-card-header>

    <md-card-media>
      <img
        class="sticker"
        loading="lazy"
        :src="'/assets/img/' + sticker.img"
        alt="Sticker"
      />
    </md-card-media>

    <md-card-content>
      {{ sticker.desc + (sticker.desc.slice(-1) === "." ? "" : ".") }}
    </md-card-content>

    <md-card-actions>
      <md-button class="md-accent" @click="authed(sticker.id)">Vote</md-button>
    </md-card-actions>
  </md-card>
</template>

<script>
export default {
  name: "Card",
  props: ["sticker"],
  methods: {
    authed(stickerId) {
      if (!this.$auth.isAuthenticated) {
        this.$auth.loginWithRedirect();
      } else {
        this.$emit("voted", stickerId);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.c-marg {
  margin-bottom: 7px !important;
}

.sticker {
  max-width: 250px;
  max-height: 250px;
  height: 250px;
  width: 250px;
  object-fit: contain;
  padding-left: 16px;
}
</style>
