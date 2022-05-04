import { BrowserRouter as Router, Routes, Route, Link, Navigate} from "react-router-dom";
import {ApolloClient, InMemoryCache, ApolloProvider} from "@apollo/client";
import {createUploadLink} from "apollo-upload-client";
import CreateUser from './Components/CreateUser';
import ListOfUsers from './Components/ListOfUsers';
import UpdatePw from './Components/UpdatePw';
import Main from './Routes/Main';
import PostArticle from './Routes/PostArticle';
import CreateCategory from './Routes/CreateCategory';
import Category from './Routes/Category';
import MovieSearch from './Routes/MovieSearch';
import Header from './Components/Header';
import Login from './Routes/Login';
import Join from './Routes/Join';
import EditArticle from "./Routes/EditArticle";
import Article from "./Routes/Article";

function App() {

  const BASE_URL:string = "http://localhost:3001/graphql";

  const link = createUploadLink({
    uri : BASE_URL,
    credentials : 'include'
  });

  const client = new ApolloClient({
    link : link,
    cache : new InMemoryCache(),
  });

  return (
    <Router>
      <ApolloProvider client={client}>
        <Header/>
        <Routes>
          <Route path="/" element={<Main/>}></Route>
          <Route path="/moviesearch" element={<MovieSearch/>}></Route>
          <Route path="/createCategory" element={<CreateCategory/>}></Route>
          <Route path="/category/:cateId" element={<Category/>}></Route>
          <Route path="/category/:cateId/article/:articleId" element={<Article/>}></Route>
          <Route path="/category/:cateId/editArticle/:articleId" element={<EditArticle/>}></Route>
          <Route path="/postarticle/:cateId" element={<PostArticle/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/join" element={<Join/>}></Route>



          
          <Route path="/createuser" element={<CreateUser/>}></Route>
          <Route path="/listofusers" element={<ListOfUsers/>}></Route>
          <Route path="/updatepw" element={<UpdatePw/>}></Route>

        </Routes>
      </ApolloProvider>
    </Router>
  );
}

export default App;
