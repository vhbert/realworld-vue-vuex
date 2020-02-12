<template>
    <div class="card">
        <div class="card-block">
            <p class="card-text">{{comment.body}}</p>
        </div>
        <div class="card-footer">
            <a href="" class="comment-author">
                <img :src="comment.author.image" class="comment-author-img" alt="Author"/>
            </a> &nbsp;
            <a href="" class="comment-author">{{comment.author.username}}</a>
            <span class="date-posted">{{new Date(comment.createdAt).toDateString()}}</span>
            <span v-if="isCommentFromUser" class="mod-options">
             <loading-spinner v-if="isDeleting" margin="0" size="24px"/>
             <i v-else class="ion-trash-a" @click="deleteComment"/>
         </span>
        </div>
    </div>
</template>

<script>
  import LoadingSpinner from "./LoadingSpinner";

  export default {
    name: "CommentItem",
    props: {
      comment: {type: Object},
      articleSlug: {type: String},
    },
    components: {
      LoadingSpinner
    },
    data() {
      return {
        isDeleting: false
      };
    },
    computed: {
      isCommentFromUser() {
        if (this.$store.state.auth.loggedInUser) {
          return this.$store.state.auth.loggedInUser.username === this.comment.author.username;
        } else {
          return false;
        }
      }
    },
    methods: {
      deleteComment() {
        this.isDeleting = true;
        this.$store.dispatch('deleteComment', {slug: this.articleSlug, id: this.comment.id}).then(() => {
          this.isDeleting = false;
        });
      }
    }
  };
</script>
