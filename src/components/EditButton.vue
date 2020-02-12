<template>
    <button class="btn btn-sm btn-outline-secondary" @click="editArticle">
        <i class="ion-edit"/>Edit Article
    </button>
</template>

<script>
  export default {
    name: "EditButton",
    props: {
      article: Object
    },
    methods: {
      editArticle() {
        this.$router.push({name: 'Editor', params: {slug: this.article.slug}});
      }
    }
  };
</script>
