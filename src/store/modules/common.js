const state = {
  isLoading: false,
  errors:[],
  articles: {
    data: {
      author: {},
      body: '',
      createdAt: '',
      description: '',
      favorited: false,
      favoritesCount: 0,
      slug: '',
      tagList: [],
      title: '',
      updatedAt: ''
    },
    articlesCount: 0,
    error: ''
  }
};

const actions = {
  setLoading({commit},val) {
    commit('setLoading', val);
  },
};

const mutations = {
  setLoading(state, val) {
    state.isLoading = val;
  },
  setErrors(state,errors){
    state.errors = errors;
  }
};


export default {
  state,
  actions,
  mutations
};
