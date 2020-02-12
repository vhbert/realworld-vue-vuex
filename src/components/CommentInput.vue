<template>
    <form v-if="currentUser" class="card comment-form">
        <div class="card-block">
            <loading-spinner v-if="isPosting" margin="40px"/>
            <textarea v-else class="form-control"
                      placeholder="Write a comment..."
                      rows="3"
                      v-model="commentBody"/>
        </div>
        <div class="card-footer">
            <img :src="currentUser.image" class="comment-author-img" alt=""/>
            <button :class="[this.isPosting ? 'disabled' : '','btn btn-sm btn-primary']" @click="createComment">
                Post Comment
            </button>
        </div>
    </form>
    <div v-else class="card-block">Please log in to post a comment</div>
</template>

<script>
  import LoadingSpinner from "./LoadingSpinner";

  export default {
    name: "CommentInput",
    components: {
      LoadingSpinner
    },
    props: {
      article: {type: Object},
    },
    data() {
      return {
        commentBody: '',
        isPosting: false,
      };
    },
    computed: {
      currentUser() {
        return this.$store.state.auth.loggedInUser;
      }
    },
    methods: {
      createComment(e) {
        e.preventDefault();
        this.isPosting = true;
        this.$store.dispatch('addComment', {slug: this.article.slug, comment: {body: this.commentBody}}).then(() => {
          this.$store.dispatch('getComments', this.article.slug);
          this.commentBody = "";
          this.isPosting = false;
        }).catch(err => console.log(err));
      },
    }
  };
</script>
