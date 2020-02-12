<template>
   <div class="profile-page">
      <div class="user-info">
         <div class="container">
            <div class="row">
               <div v-if="profile" class="col-xs-12 col-md-10 offset-md-1">
                  <img v-if="profile.image" :src="profile.image" class="user-img" alt=""/>
                  <h4>{{profile.username}}</h4>
                  <p>{{profile.bio}}</p>
                  <follow-button v-if="!isOwnProfile && isLoggedIn" />
               </div>
            </div>
         </div>
      </div>
      <div class="container">
         <div class="row">
            <div class="col-xs-12 col-md-10 offset-md-1">
               <div class="articles-toggle">
                  <ul class="nav nav-pills outline-active">
                     <li class="nav-item">
                        <router-link class="nav-link" :to="{name: 'ProfileArticles'}" exact-active-class="active">
                           My Articles
                        </router-link>
                     </li>
                     <li class="nav-item">
                        <router-link class="nav-link" :to="{name: 'ProfileFavorites'}" exact-active-class="active">
                           Favorited Articles
                        </router-link>
                     </li>
                  </ul>
               </div>
               <router-view/>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
  import LoadingSpinner from "../components/LoadingSpinner";
  import ArticlePreview from "../components/ArticlePreview";
  import FollowButton from "../components/FollowButton";
  import store from "../store";

  export default {
    name: "Profile",
    props: {
      username: ''
    },
    components: {
      LoadingSpinner,
      ArticlePreview,
      FollowButton
    },
    watch: {
      $route(to) {
        store.dispatch('setLoading', true);
        store.dispatch('getUserProfile', to.params.username);
      }
    },
    computed: {
      isLoading() {
        return this.$store.state.common.isLoading;
      },
      isLoggedIn() {
        return this.$store.getters.isLoggedIn;
      },
      isOwnProfile() {
        return this.$store.state.auth.loggedInUser ? this.$store.state.auth.loggedInUser.username === this.profile.username : false;
      },
      profile() {
        return this.$store.state.profile.activeProfile;
      }
    },
     created() {
        store.dispatch('setLoading', true);
        store.dispatch('getUserProfile', this.$route.params.username);
     }
  };
</script>
