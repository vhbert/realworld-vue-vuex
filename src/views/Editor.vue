<template>
    <div class="editor-page">
        <div class="container page">
            <div class="row">
                <div class="col-md-10 offset-md-1 col-xs-12">
                    <error-list :errors="formattedErrors"/>
                    <form>
                        <fieldset>
                            <fieldset class="form-group">
                                <input v-model="article.title" type="text" class="form-control form-control-lg"
                                       placeholder="Article Title">
                            </fieldset>
                            <fieldset class="form-group">
                                <input v-model="article.description" type="text" class="form-control"
                                       placeholder="What's this article about?">
                            </fieldset>
                            <fieldset class="form-group">
                            <textarea v-model="article.body" class="form-control" rows="8"
                                      placeholder="Write your article (in markdown)"/>
                            </fieldset>
                            <fieldset class="form-group">
                                <input v-model="tags" type="text" class="form-control"
                                       placeholder="Enter tags">
                                <div class="tag-list"></div>
                            </fieldset>
                            <button class="btn btn-lg pull-xs-right btn-primary" @click="submitForm"
                                    type="button">
                                <template v-if="this.slug">Update Article</template>
                                <template v-else>Publish Article</template>
                            </button>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import ErrorList from "../components/ErrorList";

  export default {
    name: "Editor",
    props: {
      slug: String
    },
    components: {
      ErrorList
    },
    data() {
      return {
        article: {},
        tags: ''
      };
    },
    watch: {
      $route(to, from) {
        this.article = {};
      }
    },
    computed: {
      tagList() {
        return this.tags.length === 0 ? [] : this.tags.split(" ");
      },
      formattedErrors() {
        const authErrors = this.$store.state.common.errors;
        let formattedErrors = [];
        Object.keys(authErrors).map(key => {
          for (const i in authErrors[key]) {
            formattedErrors.push(`${key} ${authErrors[key][i]}`);
          }
        });
        return formattedErrors;
      }
    },
    methods: {
      submitForm(e) {
        e.preventDefault();
        this.article={...this.article,tagList:this.tagList};
        if (this.slug) {
          this.$store.dispatch('updateArticle', {slug: this.slug, article: this.article}).then((res) => {
            this.$store.dispatch('getArticle', {slug: this.slug});
            this.$router.push({name: 'Article', params: {slug: this.slug}});
          });
        } else {
          this.$store.dispatch('createArticle', this.article).then(() => this.$router.push('/')).catch(err => {
          });
        }
      }
    }, created() {
      if (this.slug) {
        this.$store.dispatch('getArticle', {slug: this.slug, allowStored: true}).then((res) => {
          this.article = this.$store.state.article.activeArticle;
          this.tags = this.article.tagList.join(' ');
        });
      }
    }
  };

</script>
