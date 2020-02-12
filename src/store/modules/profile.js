import APIService from "../../services/APIService";

const state = {
  activeProfile: {},
};

const actions = {
  async getUserProfile({commit}, username) {
    await APIService.Request.getUserInfo(username).then(r => {
      commit('setActiveProfile', r.data.profile);
      return Promise.resolve();
    }).catch(err => {
      commit('setErrors', err.response.data.errors);
      return Promise.reject(err.response.status);
    }).finally(() => {
      commit('setLoading', false);
    });
  },

  async followUser({commit, state}, username) {

    if (state.activeProfile.following === true) {
      commit('setProfileFollowing', false);
      await APIService.Request.unSetFollow(username).then(r => {
        commit('setActiveProfile', r.data.profile);
        return Promise.resolve();
      }).catch(err => console.log(err));
    } else {
      commit('setProfileFollowing', true);
      await APIService.Request.setFollow(username).then(r => {
        commit('setActiveProfile', r.data.profile);
        return Promise.resolve();
      });
    }
  }
};

const mutations = {
  setActiveProfile(state, profile) {
    state.activeProfile = profile;
  },
  setProfileFollowing(state, follow) {
    state.activeProfile = Object.assign({}, state.activeProfile, {following: follow});
  }
};


export default {
  state,
  actions,
  mutations
};
