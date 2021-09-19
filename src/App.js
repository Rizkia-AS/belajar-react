import Header from "./components/Header";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Home from "./components/Home";
import NewPost from "./components/NewPost";
import PostPage from "./components/PostPage";
import EditPost from "./components/EditPost";
import About from "./components/About";
import Missing from "./components/Missing";



import {Route, Switch } from "react-router-dom"
import { DataProvider } from "./contexts/DataContext";



function App() {
  return (
    <div className="App">
      <Header title="React JS Blog"/>
      <DataProvider>
          <Nav/>
          <Switch>
            {/* exact digunakan agar URL yg dirender exactly same with path*/}
            <Route exact path="/" component={Home} />
            <Route exact path="/post" component={NewPost} />
            <Route path="/edit/:id" component={EditPost}/>
            <Route path="/post/:id" component={PostPage}/>

            {/* about dan missing menggunakan cara yg berbeda, karena tidak ada props yang akan dikirimkan ke component tersebut */}
            <Route path="/about" component={About}/>
            <Route path="*" component={Missing} />
          </Switch>
      </DataProvider>
      <Footer />
      
    </div>
  );
}

export default App;






  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     try {
  //       // axios otomatis mengembalikan dalam bentuk JSON sehingga tidak perlu lagi res.json() seperti yang dilakukan pada fetch, axios otomatis menangkap error sehingga tidak perlu lagi if(!response.ok)
  //       const response = await api.get(`/posts`);
  //       setPosts(response.data);
  //     } catch (err) {
  //       // jika tidak oke
  //       // console.log dibawah terdapat pada dokumentasi axios
  //       if(err.response) {
  //       console.log(err.response.data);
  //       console.log(err.response.status);
  //       console.log(err.reponse.headers);
  //       } else {
  //         console.log(`Error: ${err.message}`) }
  //     }
  //   }

  //   fetchPosts();
  // },[])