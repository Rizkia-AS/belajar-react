import { useEffect,useState,useContext } from "react";
import { useParams, Link,useHistory } from "react-router-dom"
import {format} from "date-fns";
import api from "../api/api.js"
import DataContext from "../contexts/DataContext"

const EditPost = () => {
    const {posts,setPosts} = useContext(DataContext);

    const [editTitle, setEditTitle] = useState(``);
    const [editBody, setEditBody] = useState(``);

    const history = useHistory();

    const handleEdit = async id => {
        const datetime =  format(new Date(), "MMMM dd, yyyy pp")
        const updatedPost = {id, title:editTitle, datetime, body: editBody}

        try {
            const response = await api.put(`/posts/${id}`,updatedPost);
            setPosts(posts.map(post => post.id === id ? {...response.data} : post));
            setEditTitle(``);
            setEditBody(``);
            history.push(`/`);
        } catch(err) {
            console.log(err.message)
        }
    }



        const {id} = useParams()
        const post = posts.find(post => (post.id).toString() === id);

        useEffect(() => {
            if(post) {
                setEditTitle(post.title);
                setEditBody(post.body);
            }
        },[post,setEditTitle,setEditBody])
    return (
        <main className="NewPost">
            {post &&
            <>
                <h2>Edit Post</h2>
                <form className="newPostForm" action="" onSubmit={e => e.preventDefault()}>

                    <label htmlFor="postTitle">Title</label>
                    <input type="text"
                    id="postTitle"
                    required
                    value={editTitle}
                    onChange={e => setEditTitle(e.target.value)}
                    />

                    <label htmlFor="postBody">Post</label>
                    <textarea id="postBody" 
                    required
                    value={editBody}
                    onChange={e => setEditBody(e.target.value)}
                    ></textarea>

                    <button type="submit" onClick={() => {
                        handleEdit(post.id)
                    }}>Submit</button>
                </form>
            </>
            } 
            {!post &&
                <>
                <h2>Post Not Found</h2>
                <p>Well, that's disappointing</p>
                <p>
                    <Link to="/">Visit our Homepage</Link>
                </p>
                </>
            }
        </main>
    )
}

export default EditPost
