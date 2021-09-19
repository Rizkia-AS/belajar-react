import { useParams,Link,useHistory } from "react-router-dom"
import { useContext } from "react"
import api from "../api/api"
import DataContext from "../contexts/DataContext"

const PostPage = () => {
    const {posts,setPosts} = useContext(DataContext)
    const history = useHistory();

    const handleDelete = async id => {
        try {
            await api.delete(`/posts/${id}`);
            const postList = posts.filter(post => post.id !== id);
            setPosts(postList);
    
            // history.push bekerja sma seperti Link namun bedanya history.push langsung mengarahkan pada component yang dituju tanpa harus di click seperti Link
            history.push(`/`)
        } catch (err) {
            console.log(err.message);
        }
        }

    // useParams dibawah akan mengembalikan URL dengan parameter id
    const {id} = useParams();
    const post = posts.find(post => (post.id).toString() === id);

    return (
        <main className="PostPage">
            <article className="post">
                {/* && sma dengan ?, perbedaannya adalah && hanya akan terjadi jika if benar jika salah tidak akan terjadi apapun */}
                {post &&
                <>
                <h2>{post.title}</h2>
                <p className="postDate">{post.datetime}</p>
                <p className="postBody">{post.body}</p>
                <Link to={`/edit/${post.id}`} >
                    <button className="editButton">
                        Edit Post
                    </button>
                </Link>
                <button onClick={() => handleDelete(post.id)} className="deleteButton">
                    Delete Post
                </button>
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
            </article>
        </main>
    )
}

export default PostPage
