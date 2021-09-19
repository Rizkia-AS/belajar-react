import { useState, useContext } from "react"
import { useHistory } from "react-router";
import {format} from "date-fns";
import api from "../api/api";
import DataContext from "../contexts/DataContext"

const NewPost = () => {
    const [postTitle, setPostTitle] = useState(``);
    const [postBody, setPostBody] = useState(``);
    const {posts,setPosts} = useContext(DataContext);
    const history = useHistory();

    const handleSubmit = async e => {
        e.preventDefault()
        const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
        const datetime =  format(new Date(), "MMMM dd, yyyy pp")
        const newPost = {id, title:postTitle, datetime, body: postBody}
        try {
          const response = await api.post(`/posts`, newPost)
          // response.data berisi hal yang sama dengan newPost
          const allPosts = [...posts, response.data];
          setPosts(allPosts);
          setPostTitle(``);
          setPostBody(``);
          history.push(`/`);
        } catch (err) {
          console.log(err.message);
        }
    }

    return (
        <main className="NewPost">
            <h2>New Post</h2>
            <form className="newPostForm" action="" onSubmit={handleSubmit}>

                <label htmlFor="postTitle">Title</label>
                <input type="text"
                id="postTitle"
                required
                value={postTitle}
                onChange={e => setPostTitle(e.target.value)}
                />

                <label htmlFor="postBody">Post</label>
                <textarea id="postBody" 
                required
                value={postBody}
                onChange={e => setPostBody(e.target.value)}
                ></textarea>

                <button type="submit">Submit</button>
            </form>
        </main>
    )
}

export default NewPost
