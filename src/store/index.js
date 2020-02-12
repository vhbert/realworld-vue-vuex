import Vue from 'vue';
import Vuex from 'vuex';
import common from "./modules/common";
import article from "./modules/article";
import auth from "./modules/auth";
import user from "./modules/user";
import profile from "./modules/profile";
import {VuexPersistence} from "vuex-persist";

Vue.use(Vuex);
const vuexLocal = new VuexPersistence({
  storage: window.localStorage
});

const store = new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    common,
    auth,
    article,
    user,
    profile
  },
  plugins: [vuexLocal.plugin]

});
export default store;