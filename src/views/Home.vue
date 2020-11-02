<template>
  <div v-if="stickers[0].votes !== null" class="md-layout md-gutter">
    <div
      class="md-layout-item md-size-33 md-small-size-50 md-xsmall-size-100"
      v-for="sticker in sorted"
      :key="sticker.id"
    >
      <Card @voted="voted" v-bind:sticker="sticker" />
    </div>
  </div>
</template>

<script>
import Card from "@/components/card.vue";
import Data from "@/assets/data.json";

export default {
  name: "Home",
  props: ["clear"],
  data() {
    return {
      stickers: Data
    };
  },
  methods: {
    voted(stickerId) {
      if (!this.$auth.isAuthenticated) {
        this.$auth.loginWithRedirect();
      } else {
        // block/allow certain users by redirecting the unwanted somewhere else
        if (
          this.$auth.user.sub.split("|").reverse()[0] === "123456789876543210"
        )
          return (window.location.href = "https://github.com/GeopJr");
        this.vote(stickerId);
      }
    },
    fetchVotes() {
      this.$nextTick(function() {
        this.$http
          .get("{backend}/votes")
          .then(result => {
            const votes = result.data;
            this.stickers.forEach((x, y) =>
              this.$set(
                this.stickers[y],
                "votes",
                Object.prototype.hasOwnProperty.call(votes, x.id)
                  ? votes[x.id]
                  : 0
              )
            );
          });
      });
    },
    vote(stickerId) {
      this.$http
        .post("{backend}/update", {
          id: this.$auth.user.sub.split("|").reverse()[0],
          vote: stickerId
        })
        .then(result => {
          const votes = result.data;
          console.log(votes);
          this.stickers.forEach((x, y) =>
            this.$set(
              this.stickers[y],
              "votes",
              Object.prototype.hasOwnProperty.call(votes, x.id)
                ? votes[`${x.id}`]
                : 0
            )
          );
        });
    }
  },
  components: {
    Card
  },
  computed: {
    sorted() {
      return [...this.stickers].sort((a, b) => b.votes - a.votes);
    }
  },
  mounted() {
    this.fetchVotes();
  },
  created() {
    this.$emit("clear");
  }
};
</script>

<style lang="less" scoped>
.md-layout-item {
  margin-bottom: 25px !important;
}

.md-card {
  height: 100% !important;
}
</style>
