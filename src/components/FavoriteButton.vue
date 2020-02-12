<template>
    <button :class="[article.favorited?'btn-primary':'btn-outline-primary', 'btn btn-sm']"
            @click="handleFavorite">
        <i class="ion-heart"/>
        <template v-if="article.favorited"> Unfavorite Post</template>
        <template v-else> Favorite Post</template>
        <span class="counter"> ({{article.favoritesCount}})</span>
    </button>
</template>

<script>
  export default {
    name: "FavoriteButton",
    props: {
      article: Object
    },
    methods: {
      handleFavorite() {
        if (!this.$store.state.auth.loggedInUser) {
          this.$router.push({name: 'Login'});
          return;
        }
        this.$store.dispatch('setFavorite', {slug: this.article.slug, current: true});
      }
    }
  };
</script>
