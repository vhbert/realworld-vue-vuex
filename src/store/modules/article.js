import APIService from "../../services/APIService";

const state = {
  activeArticle: null,
  articles: null,
  activeComments: [],
  filterCondition: {all: ''},
  tagList: []
};


const mutations = {
  setFilter(state, filter) {
    state.filterCondition = filter;
  },

  setTags(state, tags) {
    state.tagList = tags;
  },

  setArticles(state, article) {
    state.articles = article;
  },

  setActiveArticle(state, article) {
    state.activeArticle = article;
  },

  updateArticleList(state, article) {
    state.articles = state.articles.map((articleIndex) => {
      if (articleIndex.slug !== article.slug) return articleIndex;
      return Object.assign({}, articleIndex, article);
    });
  },

  removeArticleFromList(state, article) {
    const index = state.articles.map(e => e.slug).findIndex(e => e === article.slug);
    state.articles.splice(index, 1);
  },

  setActiveComments(state, comments) {
    state.activeComments = comments;
  }

};
const actions = {
  setFilter({commit}, filter) {
    commit('setFilter', filter);
  },

  setTags({commit}, tags) {
    commit('setTags', tags);
  },

  async createArticle({commit}, article) {
    await APIService.Request.createArticle(article).then(r => {
      return Promise.resolve();
    }).catch(err => {
      commit('setErrors', err.response.data.errors);
      return Promise.reject(err);
    });
  },

  async updateArticle({commit}, {slug, article}) {
    await APIService.Request.updateArticle(slug, article).then(r => {
      return Promise.resolve();
    }).catch(err => {
      commit('setErrors', err.response.data.errors);
      return Promise.reject(err);
    });
  },

  async deleteArticle({commit}, slug) {
    await APIService.Request.deleteArticle(slug).then(r => {
      return Promise.resolve();
    }).catch(err => {
      return Promise.reject(err);
    });
  },

  async setFavorite({commit, state}, {slug, current}) {
    let article = {};
    if (current) {
      article = {...state.activeArticle};
    } else {
      const articleIndex = state.articles.findIndex(e => e.slug === slug);
      article = {...state.articles[articleIndex]};
    }

    if (article.favorited) {
      article.favorited = false;
      article.favoritesCount -= 1;
      commit('updateArticleList', article);
      commit('setActiveArticle', article);
      await APIService.Request.unSetFavorite(slug).then(r => {
        return Promise.resolve();
      }).catch(err => {
        article.favorited = true;
        article.favoritesCount += 1;
        commit('updateArticleList', article);
        commit('setActiveArticle', article);
        return Promise.reject(err);
      });
    } else {
      article.favorited = true;
      article.favoritesCount += 1;
      commit('updateArticleList', article);
      commit('setActiveArticle', article);
      await APIService.Request.setFavorite(slug).then(r => {
        return Promise.resolve();
      }).catch(err => {
        article.favorited = false;
        article.favoritesCount -= 1;
        commit('updateArticleList', article);
        commit('setActiveArticle', article);
        return Promise.reject(err);
      });
    }
  },

  clearArticles({commit}) {
    commit('setArticles', []);
    commit('setLoading', true);
  },

  getTagList({commit}) {
    APIService.Request.getTags().then(r => {
      commit('setTags', r.data.tags);
    });
  },

  getArticle({commit}, {slug, allowStored = false}) {
    if (allowStored) {
      let article;
      if (state.articles)
        article = state.articles.find(a => a.slug === slug);
      if (article) {
        commit('setActiveArticle', article);
        return;
      }
    }
    return APIService.Request.getArticle(slug).then(r => {
      commit('setActiveArticle', r.data.article);
      commit('setLoading', false);
    });

  },

  getArticles({state, commit}) {
    let filterCondition = state.filterCondition;
    commit('setLoading', true);
    if (filterCondition.tag) {
      return APIService.Request.getArticlesByTag(filterCondition.tag).then(r => {
        commit('setLoading', false);
        commit('setArticles', r.data.articles);
      });
    } else
      if (filterCondition.author) {
      return APIService.Request.getArticlesByAuthor(filterCondition.author).then(r => {
        commit('setLoading', false);
        commit('setArticles', r.data.articles);
      }).catch(err => {
      });
    } else if (filterCondition.favoritedBy) {
      return APIService.Request.getArticlesByFavoritedUser(filterCondition.favoritedBy).then(r => {
        commit('setLoading', false);
        commit('setArticles', r.data.articles);
      });
    } else if (filterCondition.feed) {
      return APIService.Request.getArticlesFeed().then(r => {
        commit('setLoading', false);
        commit('setArticles', r.data.articles);
      });
    } else {
      return APIService.Request.getArticles().then(r => {
        commit('setLoading', false);
        commit('setArticles', r.data.articles);
      });
    }
  },

  getComments({commit}, slug) {
    return APIService.Request.getComments(slug).then(r => {
      commit('setActiveComments', r.data.comments);
    });
  },

  async addComment({commit}, {slug, comment}) {
    await APIService.Request.addComment(slug, comment).then(r => {
      return Promise.resolve(r);
    }).catch(err => {
    });
  },

  async deleteComment({commit, state}, {slug, id}) {
    await APIService.Request.deleteComment(slug, id).then(r => {
      const comments = [...state.activeComments];
      comments.splice(comments[comments.map(e => e.id).findIndex(c => c === id)], 1);
      commit('setActiveComments', comments);
      return Promise.resolve(r);
    }).catch(err => {
    });
  }
};

export default {
  state,
  actions,
  mutations
};
