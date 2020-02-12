<template>
    <div class="home-page">
        <div class="banner">
            <div class="container">
                <h1 class="logo-font">conduit</h1>
                <p>A place to share your knowledge.</p>
            </div>
        </div>
        <div class="container page">
            <div class="row">
                <div class="col-md-9">
                    <div class="feed-toggle">
                        <ul class="nav nav-pills outline-active">
                            <li v-if="isLoggedIn" class="nav-item">
                                <router-link class="nav-link"
                                             :to="{name:'Home',query:{type:'feed'}}"
                                             exact-active-class="active">Your Feed
                                </router-link>
                            </li>
                            <li class="nav-item">
                                <router-link class="nav-link "
                                             :to="{name:'Home'}"
                                             exact-active-class="active">Global Feed
                                </router-link>
                            </li>
                            <li v-if="tag" class="nav-item">
                                <router-link class="nav-link"
                                             :to="{name:'Home',query:{type:'tag',tag:tag}}"
                                             exact-active-class="active">
                                    <i class="ion-pound"/> {{tag}}
                                </router-link>
                            </li>
                        </ul>
                    </div>
                    <loading-spinner v-if="isLoading"/>
                    <article-preview v-else v-for="article in articleList" :key="article.slug"
                                     :article="article"/>
                </div>
                <div class="col-md-3">
                    <div class="sidebar">
                        <p>Popular Tags</p>
                        <tag-list :tags="tags"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  // @ is an alias to /src
  import LoadingSpinner from "../components/LoadingSpinner";
  import ArticlePreview from "../components/ArticlePreview";
  import TagList from "../components/TagList";


  export default {
    name: 'home',
    props: {
      type: String,
      tag: String
    },
    components: {
      TagList,
      ArticlePreview,
      LoadingSpinner
    },
    watch: {
      $route(to, from) {
        this.setTag();
        this.$store.dispatch('getArticles');
      }
    },
    methods: {
      setTag() {
        switch (this.type) {
          case "tag":
            this.$store.dispatch('setFilter', {tag: this.tag});
            break;
          case "feed":
            this.$store.dispatch('setFilter', {feed: {}});
            break;
          default:
            this.$store.dispatch('setFilter', {all: {}});
            break;
        }
      }
    },
    computed: {
      isLoading() {
        return this.$store.state.common.isLoading;
      },
      isLoggedIn() {
        return this.$store.getters.isLoggedIn;
      },
      articleList() {
        return this.$store.state.article.articles;
      },
      tags() {
        return this.$store.state.article.tagList;
      }
    },
    created() {
      this.setTag();
      this.$store.dispatch('getArticles');
      this.$store.dispatch('getTagList');

    }
  };
</script>
