<template>
    <button class="btn btn-outline-danger btn-sm" @click="deleteArticle">
        <i class="ion-trash-a"/> Delete Article
    </button>
</template>

<script>
  export default {
    name: "DeleteButton",
    props: {
      article: Object
    },
    methods: {
      deleteArticle() {
        this.$store.dispatch('deleteArticle', this.article.slug).then(() => {
          this.$router.push({name: 'Home'});
        });
      }
    }
  };
</script>
