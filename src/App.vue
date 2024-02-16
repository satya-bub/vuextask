<template>
<div>
    <h1>Title And Content Dashboard</h1>
    <PostPage v-for="post in posts" :key="post.id" :post="post" @add-comment="addComment" @toggle-like="toggleLike" @delete-post="deletePost" />
    <textarea v-model="newPost.title" placeholder="Post Title"></textarea>
    <textarea v-model="newPost.content" placeholder="Post Content"></textarea>
    <button @click="addPost">Add Post</button>
</div>
</template>

<script>
import {
    ref
} from 'vue';
import {
    useStore
} from 'vuex';
import PostPage from './components/PostPage.vue';

export default {
    components: {
        PostPage,
    },
    setup() {
        const store = useStore();

        const newPost = ref({
            title: '',
            content: ''
        });

        const posts = store.getters.getPosts;

        const addPost = () => {
            store.dispatch('addPost', {
                ...newPost.value,
                comments: [],
                isLiked: false
            });
            newPost.value = {
                title: '',
                content: ''
            };
        };

        const addComment = ({
            postId,
            comment
        }) => {
            store.dispatch('addComment', {
                postId,
                comment
            });
        };

        const toggleLike = postId => {
            store.dispatch('toggleLike', postId);
        };

        const deletePost = postId => {
            store.dispatch('deletePost', postId);
        };

        return {
            posts,
            newPost,
            addPost,
            addComment,
            toggleLike,
            deletePost
        };
    },
};
</script>

<style scoped>
h1 {
    text-align: center;
    color: #333;
}

textarea {
    width: 100%;
    padding: 5px;
    margin: 5px 0;
}

button {
    background-color: #2ecc71;
    color: #fff;
    padding: 5px 10px;
    margin: 5px;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

button:hover {
    background-color: #27ae60;
}
</style>
