<template>
    <div class="article-meta">
        <router-link :to="{name:'ProfileArticles',params:{ username:article.author.username }}">
            <img :src="article.author.image" alt=""/>
        </router-link>
        <div class="info">
            <router-link :to="{name:'ProfileArticles',params:{ username:article.author.username }}" class="author">
                {{article.author.username}}
            </router-link>
            <span class="date">{{new Date(article.createdAt).toLocaleDateString()}}</span>
        </div>
        <template v-if="isOwnArticle">
            <delete-button :article="article"/>
            <edit-button :article="article"/>
        </template>
        <template v-else-if="isLoggedIn">
            <follow-button /> &nbsp;
            <favorite-button :article="article"/>
        </template>
    </div>
</template>

<script>
  import FollowButton from "./FollowButton";
  import FavoriteButton from "./FavoriteButton";
  import DeleteButton from "./DeleteButton";
  import EditButton from "./EditButton";

  export default {
    name: "ArticleInfo",
    components: {
      EditButton,
      DeleteButton,
      FollowButton,
      FavoriteButton
    },
    props: {
      article: {},
    },
    computed: {
      isOwnArticle() {
        return this.$store.state.auth.loggedInUser ? this.$store.state.auth.loggedInUser.username === this.article.author.username : false;
      },
      isLoggedIn() {
        return this.$store.getters.isLoggedIn;
      }
    },
  };
</script>