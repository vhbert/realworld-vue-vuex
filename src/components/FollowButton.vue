<template>
    <button :class="[profile.following===true?'btn-outline-secondary':'btn-secondary','btn btn-sm action-btn']"
            @click="handleFollow">
        <i class="ion-plus-round"/>
        <template v-if="profile.following===true"> Unfollow</template>
        <template v-else>Follow</template>
    </button>
</template>

<script>
  export default {
    name: "FollowButton",
    computed: {
      profile() {
        return this.$store.state.profile.activeProfile;
      }
    },
    methods: {
      handleFollow() {
        this.$store.dispatch('followUser', this.profile.username);
      }
    },
  };
</script>

