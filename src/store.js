import {createStore,action,thunk,computed} from "easy-peasy"
import api from "./api/api"
// store provider akan menyediakan semua state yg dibutuhkan aplikasi di dalam sebuah file

// membuat easy peasy store, untuk kemudian nantinya diaplikasikan pada easy peasy
export default createStore({
    posts: [],
    setPosts: action((state,payload) => {
        state.posts = payload;
    }),
    postTitle: ``,
    setPosts: action((state,payload) => {
        state.postTitle = payload;
    }),
    postBody: ``,
    setPosts: action((state,payload) => {
        state.postBody = payload;
    }),
    editTitle: ``,
    setPosts: action((state,payload) => {
        state.editTitle = payload;
    }),
    editBody: ``,
    setPosts: action((state,payload) => {
        state.editBody = payload;
    }),
    search: ``,
    setPosts: action((state,payload) => {
        state.search = payload;
    }),
    searchResults: [],
    setPosts: action((state,payload) => {
        state.searchResults = payload;
    }),
    postCount: computed((state) => state.posts.length),
    getPostById : computed((state) => {
        return id => state.posts.find(post => (post.id).toString() === id)
    }),
    savePost: thunk( async (actions,newPost,helpers) => {
        const {posts} = helpers.getState();
        try {
        const response = await api.post(`/posts`, newPost);
        actions.setPosts([...posts, response.data]);
        actions.setPostTitle(``);
        actions.setPostBody(``);
        } catch (err) {
        console.log(err.message);
        }
    }),
    deletePost: thunk( async (actions,id,helpers) => {
        const {posts} = helpers.getState(); 
        try {
            await api.delete(`/posts/${id}`);
            actions.setPosts(posts.filter(post => post.id !== id));
        } catch (err) {
            console.log(err.message);
        }
    }),
    editPost: thunk( async (actions,updatedPost,helpers) => {
        const {posts} = helpers.getState();
        const {id} = updatedPost;
        try {
            const response = await api.put(`/posts/${id}`,updatedPost);
            actions.setPosts(posts.map(post => post.id === id ? {...response.data} : post));
            actions.setEditTitle(``);
            actions.setEditBody(``);

        } catch(err) {
            console.log(err.message)
        }
    })
});