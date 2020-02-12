<template>
    <div class="article-preview">
        <div class="article-meta">
            <router-link :to="{name:'ProfileArticles',params:{username:article.author.username}}">
                <img :src="article.author.image" alt=""/>
            </router-link>
            <div class="info">
                <router-link :to="{name:'ProfileArticles',params:{username:article.author.username}}" class="author">
                    {{article.author.username}}
                </router-link>
                <span class="date">{{formattedDate}}</span>
            </div>
            <button @click="handleFavorite"
                    :class="[article.favorited?'btn-primary':'btn-outline-primary','btn  btn-sm pull-xs-right']">
                <i class="ion-heart"/> {{article.favoritesCount}}
            </button>
        </div>
        <router-link class="preview-link" :to="{name:'Article',params:{slug:article.slug}}">
            <h1>{{article.title}}</h1>
            <p>{{article.description}}</p>
            <span>Read more...</span>
            <ul class="tag-list">
                <li v-for="tag in article.tagList" class="tag-default tag-pill tag-outline" :key=tag>
                    <router-link :to="{name:'Home',query:{type:'tag',tag:tag}}"> {{tag}}
                    </router-link>
                </li>
            </ul>
        </router-link>
    </div>
</template>

<script>
  export default {
    name: "ArticlePreview",
    props: {
      article: {
        type: Object
      },
    },
    computed: {
      formattedDate() {
        return new Date(this.article.createdAt).toDateString();
      }
    },
    methods: {
      handleFavorite() {
        if (!this.$store.getters.isLoggedIn) {
          this.$router.push({name: 'Login'});
        } else {
          this.$store.dispatch('setFavorite', {slug: this.article.slug, current: false});
        }
      }
    }
  };

</script>
