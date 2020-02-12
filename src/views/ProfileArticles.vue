<template>
    <div>
        <loading-spinner v-if="isLoading"/>
        <article-preview v-else-if="articles.length!==0" v-for="art in articles" :article="art" :key="art.id"/>
        <div v-else class="article-preview">No articles are here... yet.</div>
    </div>
</template>

<script>
  import LoadingSpinner from "../components/LoadingSpinner";
  import store from "../store";
  import ArticlePreview from "../components/ArticlePreview";

  export default {
    name: "ProfileArticles",

    components: {
      LoadingSpinner,
      ArticlePreview
    },
    props: {
      username: ''
    },
    created() {
      this.$store.commit('setArticles', {});
      this.$store.dispatch('setFilter', {author: this.username});
      this.$store.dispatch('getArticles');
    },
    computed: {
      articles() {
        return this.$store.state.article.articles;
      },
      isLoading() {
        return this.$store.state.common.isLoading;
      },
    }
  };
</script>

<style scoped>

</style>