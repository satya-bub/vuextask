<template>
    <div class="post">
      <h3>{{ post.title }}</h3>
      <p>{{ post.content }}</p>
      <button @click="toggleLike">{{ post.isLiked ? 'Unlike' : 'Like' }}</button>
      <button @click="deletePost">Delete Post</button>
      <div>
        <h4>Comments</h4>
        <ul>
          <CommentPage v-for="comment in post.comments" :key="comment.id" :comment="comment" />
        </ul>
        <input v-model="newComment" placeholder="Add a comment" />
        <button @click="addComment">Add Comment</button>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import CommentPage from './CommentPage.vue';
  
  export default {
    props: {
      post: Object,
    },
    components: {
      CommentPage,
    },
    setup(props, { emit }) {
      const newComment = ref('');
  
      const addComment = () => {
        if (newComment.value.trim() === '') {
            alert('Your comment box has empty ! write something before sending ')
        }
        else if (newComment.value.trim() !== '') {
          emit('add-comment', { postId: props.post.id, comment: { text: newComment.value, id: Date.now() } });
          newComment.value = '';
        }
      };
  
      const toggleLike = () => {
        emit('toggle-like', props.post.id);
      };
  
      const deletePost = () => {
        emit('delete-post', props.post.id);
      };
  
      return { newComment, addComment, toggleLike, deletePost };
    },
  };
  </script>
  
  <style scoped>
  .post {
    border: 1px solid #ccc;
    margin: 10px;
    padding: 10px;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease-in-out;
  }
  
  .post:hover {
    transform: scale(1.02);
  }
  
  .post h3 {
    color: #333;
  }
  
  .post p {
    color: #666;
  }
  
  .post button {
    background-color: #3498db;
    color: #fff;
    padding: 5px 10px;
    margin: 5px;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .post button:hover {
    background-color: #2980b9;
  }
  
  .delete-button {
    background-color: #e74c3c;
  }
  
  .delete-button:hover {
    background-color: #c0392b;
  }
  </style>
  