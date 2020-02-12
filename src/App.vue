<template>
    <div id="app">
        <nav-header/>
        <router-view/>
        <app-footer/>
    </div>
</template>

<script>
  import NavHeader from "./components/NavHeader";
  import AppFooter from "./components/AppFooter";
  import store from "./store";

  export default {
    name: "App",
    components: {
      NavHeader,
      AppFooter
    },
    created() {
      store.dispatch('getToken').then(() => {
        if (store.state.auth.token) {
          store.dispatch('getSelf');
        }
      });
    }
  };
</script>
