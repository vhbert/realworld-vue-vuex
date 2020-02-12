<template>
    <div class="settings-page">
        <div class="container page">
            <div class="row">
                <div class="col-md-6 offset-md-3 col-xs-12">
                    <h1 class="text-xs-center">Your Settings</h1>
                    <form>
                        <fieldset>
                            <fieldset class="form-group">
                                <input class="form-control" type="text" placeholder="URL of profile picture"
                                       v-model="profile.image">
                            </fieldset>
                            <fieldset class="form-group">
                                <input class="form-control form-control-lg" type="text" placeholder="Your Name"
                                       v-model="profile.username">

                            </fieldset>
                            <fieldset class="form-group">
                            <textarea class="form-control form-control-lg" rows="8" placeholder="Short bio about you"
                                      v-model="profile.bio"/>
                            </fieldset>
                            <fieldset class="form-group">
                                <input class="form-control form-control-lg" type="text" placeholder="Email"
                                       v-model="profile.email">
                            </fieldset>
                            <fieldset class="form-group">
                                <input class="form-control form-control-lg" type="password" placeholder="Password"
                                       v-model="profile.password">

                            </fieldset>
                            <button class="btn btn-lg btn-primary pull-xs-right" @click="submitForm">
                                Update Settings
                            </button>
                        </fieldset>
                    </form>
                    <hr>
                    <button @click="this.signOut" class="btn btn-outline-danger">Or click here to logout.</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: "Settings",
    data() {
      return {
        profile: {
          image: '',
          username: '',
          bio: '',
          email: '',
        },
        errors: {}
      };
    },
    methods: {
      submitForm(e) {
        e.preventDefault();
        this.$store.dispatch('updateUser', this.profile).then(() => this.$router.push({name: 'Home'}));
      },
      signOut() {
        this.$store.dispatch('signOut');
        this.$router.replace({name: 'Home'});
      }
    },
    created() {
      const {image, username, bio, email} = this.$store.state.auth.loggedInUser;
      Object.assign(this.profile, {image, username, bio, email});
    }
  };
</script>
