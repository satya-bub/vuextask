import { createStore } from 'vuex';

const store = createStore({
  state: {
    posts: [],
  },
  mutations: {
    addPost(state, post) {
      state.posts.push(post);
    },
    addComment(state, { postId, comment }) {
      const post = state.posts.find(p => p.id === postId);
      if (post) {
        post.comments.push(comment);
      }
    },
    toggleLike(state, postId) {
      const post = state.posts.find(p => p.id === postId);
      if (post) {
        post.isLiked = !post.isLiked;
      }
    },
    deletePost(state, postId) {
      state.posts = state.posts.splice(p => p.id !== postId);
    },
  },
  actions: {
    addPost({ commit }, post) {
      commit('addPost', post);
    },
    addComment({ commit }, payload) {
      commit('addComment', payload);
    },
    toggleLike({ commit }, postId) {
      commit('toggleLike', postId);
    },
    deletePost({ commit }, postId) {
      commit('deletePost', postId);
    },
  },
  getters: {
    getPosts: state => state.posts,
  },
});

export default store;
