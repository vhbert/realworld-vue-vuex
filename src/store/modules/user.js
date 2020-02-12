import APIService from "../../services/APIService";

const state = {
  isLoading: false,
  errors: [],

};

const actions = {
  async getSelf({commit}) {
    await APIService.Request.getUserInfo().then(r => {
      commit('setLoggedInUser', r.data.user);
      return Promise.resolve();
    }).catch(err => {
      commit('setErrors', err.response.data.errors);
      return Promise.reject(err.response.status);
    });
  },
  async updateUser({commit}, user) {
    await APIService.Request.updateUser(user).then(r => {
      commit('setLoggedInUser', r.data.user);
      return Promise.resolve();
    }).catch(err => {
      commit('setErrors', err.response.data.errors);
      return Promise.reject(err.response.status);
    });
  }
};

const mutations = {
  setLoading(state, val) {
    state.isLoading = val;
  },
  setErrors(state, errors) {
    state.errors = errors;
  }
};


export default {
  state,
  actions,
  mutations
};
