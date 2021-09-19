// membuat context
import { createContext, useState, useEffect } from "react";
import useAxiosFetch from "../hooks/useAxiosFetch";

// mendefinisikan context
const DataContext = createContext({})

export const DataProvider = ({children}) => {
    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState(``);
    const [searchResults, setSearchResults] = useState([]);


    // HOOK
    // mengirimkan url ke dalam parameter hook
    const {data, fetchError, isLoading} = useAxiosFetch(`http://localhost:3500/posts`);



    useEffect(() => {
        setPosts(data)
    },[data])

    useEffect(() => {
        const fileteredResults = posts.filter(post => 
        ((post.body).toLowerCase().includes(search.toLowerCase()))
        || ((post.title).toLowerCase().includes(search.toLowerCase()))
        )

        // .reverse akan membalikan urutan sebuah array
        setSearchResults(fileteredResults.reverse());
    },[posts,search])
    

    return (
        <DataContext.Provider value={{
            search,setSearch,
            
            searchResults,fetchError,isLoading,setPosts,

            posts
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext;