<template>
    <nav class="navbar navbar-light">
        <div class="container">
            <router-link class="navbar-brand" :to="{name:'Home'}">conduit</router-link>
            <ul class="nav navbar-nav pull-xs-right">
                <li class="nav-item">
                    <router-link class="nav-link" exact-active-class="active" :to="{name:'Home'}">Home</router-link>
                </li>
                <template v-if="isLoggedIn">
                    <li class="nav-item">
                        <router-link class="nav-link" active-class="active" :to="{name:'Editor'}">
                            <i class="ion-compose"/>&nbsp;New Post
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" active-class="active" :to="{name:'Settings'}">
                            <i class="ion-gear-a"/>&nbsp;Settings
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link"
                                     active-class="active"
                                     :to="{name:'ProfileArticles',params:{username:loggedInUser.username}}">
                            {{loggedInUser.username}}
                        </router-link>
                    </li>
                </template>
                <template v-else>
                    <li class="nav-item">
                        <router-link class="nav-link" active-class="active" :to="{name:'Login'}">
                            <i class="ion-compose"/> Sign in
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" exact-active-class="active" :to="{name:'Register'}">
                            <i class="ion-compose"/> Sign up
                        </router-link>
                    </li>
                </template>
            </ul>
        </div>
    </nav>
</template>

<script>
  export default {
    name: "NavHeader",
    props: {},
    computed: {
      isLoggedIn() {
        return this.$store.getters.isLoggedIn;
      },
      loggedInUser() {
        return this.$store.state.auth.loggedInUser;
      }
    }
  };
</script>
