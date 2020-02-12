<template>
    <div class="auth-page">
        <div class="container page">
            <div class="row">
                <div class="col-md-6 offset-md-3 col-xs-12">
                    <template v-if="isLoginPage">
                        <h1 class="text-xs-center">Sign in</h1>
                        <p class="text-xs-center">
                            <router-link :to="{name:'Register'}">Need an account?</router-link>
                        </p>
                    </template>
                    <template v-else>
                        <h1 class="text-xs-center">Sign Up</h1>
                        <p class="text-xs-center">
                            <router-link :to="{name:'Login'}">Have an account?</router-link>
                        </p>
                    </template>
                    <error-list :errors="formattedErrors"/>
                    <form>
                        <fieldset v-if="!isLoginPage" class="form-group">
                            <input v-model="profile.username" class="form-control form-control-lg" type="text"
                                   placeholder="Your Name">
                        </fieldset>

                        <fieldset class="form-group">
                            <input v-model="profile.email"
                                   class="form-control form-control-lg" type="email" placeholder="Email">
                        </fieldset>
                        <fieldset class="form-group">
                            <input v-model="profile.password"
                                   class="form-control form-control-lg" type="password" placeholder="Password">
                        </fieldset>
                        <button class="btn btn-lg btn-primary pull-xs-right" @click="submitForm">
                            <template v-if="isLoginPage">Sign In</template>
                            <template v-else>Sign Up</template>
                        </button>

                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import ErrorList from "../components/ErrorList";

  export default {
    name: "Login",
    props: {
      route: ''
    },
    data() {
      return {
        currentRoute: '',
        profile: {
          username: '',
          email: '',
          password: '',
        }
      };
    },
    components: {
      ErrorList
    },
    watch: {
      $route(to, from) {
        this.currentRoute = to.name;
      }
    },
    computed: {
      isLoginPage() {
        return this.currentRoute.toLowerCase().includes("login");
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
      submitForm(ev) {
        ev.preventDefault();
        const profile = this.profile;
        if (this.isLoginPage) {
          this.$store.dispatch('login', {
            email: profile.email,
            password: profile.password
          }).then(() => {
            this.$router.push({name: 'Home'});
          });
        } else {
          this.$store.dispatch('register', {
            username: profile.username,
            email: profile.email,
            password: profile.password
          }).then(() => {
            this.$router.push({name: 'Home'});
          });
        }
      }
    },
    created() {
      this.currentRoute = this.$route.name;
    }
  };
</script>
