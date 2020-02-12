<template>
    <div class="article-page">
        <div class="banner">
            <div class="container" v-if="!loadingArticle" >
                <h1>{{article.title}}</h1>
                <article-info :article="article"/>
            </div>
        </div>
        <div class="container page">
            <div class="row article-content" v-if="!loadingArticle">
                <div v-html="markdown" class="col-md-12"/>
                <ul class="tag-list">
                    <li v-for="tag in article.tagList" class="tag-default tag-pill tag-outline">
                        {{tag}}
                    </li>
                </ul>
            </div>
            <hr/>
            <div class="article-actions">
                <article-info v-if="!loadingArticle" :article="article"/>
            </div>
            <div class="row">
                <div class="col-xs-12 col-md-8 offset-md-2">
                    <comment-input v-if="isLoggedIn" :article="article"/>
                    <comment-item v-if="!loadingComments" v-for="comment in comments" :key="comment.id" :articleSlug="slug"
                                  :comment="comment"/>
                    <template v-else><loading-spinner/></template>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import ArticleInfo from "../components/ArticleInfo";
  import LoadingSpinner from "../components/LoadingSpinner";
  import CommentInput from "../components/CommentInput";
  import CommentItem from "../components/CommentItem";
  import store from "../store/index";
  import marked from 'marked';

  export default {
    name: "Article",
    components: {
      ArticleInfo,
      LoadingSpinner,
      CommentInput,
      CommentItem
    },
    props: {
      slug: '',

    },
    data(){
      return{
        loadingArticle:true,
        loadingComments:true,
      }
    },
    computed: {
      comments() {
        return this.$store.state.article.activeComments;
      },
      markdown() {
        return marked(this.article.body);
      },
      article() {
        return this.$store.state.article.activeArticle;
      },
      isLoggedIn() {
        return this.$store.getters.isLoggedIn;
      },
    },
    created() {
      this.$store.dispatch('getComments', this.slug).then(()=>{
        this.loadingComments = false;
      });
      this.$store.dispatch('getArticle', {slug: this.slug, allowStored: true}).then(()=>{
        this.loadingArticle = false;
      });
    }
  };

</script>