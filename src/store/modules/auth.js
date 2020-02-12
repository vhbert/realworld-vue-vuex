import APIService from "../../services/APIService";

const state = {
  token: '',
  loggedInUser: null,
};

const actions = {
  setLoggedInUser({commit}, user) {
    commit('setLoggedInUser', user);
  },

  getToken({commit}) {
    commit('setToken', window.localStorage.getItem("token"));
  },

  clearToken({commit}) {
    commit('setToken', null);
    window.localStorage.removeItem('token');
  },
  signOut({dispatch, commit}) {
    commit('setLoggedInUser', null);
    dispatch('clearToken');
  },

  async login({commit}, {email, password}) {
    commit('setLoading', true);
    await APIService.Request.login(email, password).then(r => {
      commit('setLoggedInUser', r.data.user);
      commit('setToken', r.data.user.token);
      return Promise.resolve();
    }).catch(err => {
      commit('setErrors', err.response.data.errors);
      return Promise.reject(err.response.status);
    });
  },

  async register({commit}, {username, email, password}) {
    commit('setLoading', true);
    await APIService.Request.register(username, email, password).then(r => {
      commit('setLoggedInUser', r.data.user);
      commit('setToken', r.data.user.token);
      return Promise.resolve();
    }).catch(err => {
      commit('setErrors', err.response.data.errors);
      return Promise.reject(err.response.status);
    }).finally(
      () => {
        commit('setLoading', false);
      }
    );
  }
};

const mutations = {
  setLoggedInUser(state, user) {
    state.loggedInUser = user;
  },
  setToken(state, token) {
    state.token = token;
    if (token) window.localStorage.setItem('token', token);
  },

};
const getters = {
  isLoggedIn: (state) => {
    return !!state.loggedInUser;
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
