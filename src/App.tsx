import { BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import {ApolloClient, InMemoryCache, ApolloProvider} from "@apollo/client";
import {createUploadLink} from "apollo-upload-client";
import CreateUser from './Components/CreateUser';
import ListOfUsers from './Components/ListOfUsers';
import UpdatePw from './Components/UpdatePw';
import Main from './Routes/Main';
import PostArticle from './Components/PostArticle';
import AddCategory from './Components/AddCategory';
import ListOfArticles from './Components/ListOfArticles';
import Article from './Components/Article';
import MovieSearch from './Routes/MovieSearch';
import Header from './Components/Header';

function App() {

  const BASE_URL:string = "http://localhost:3001/graphql";

  const link = createUploadLink({
    uri : BASE_URL
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
          <Route path="/createuser" element={<CreateUser/>}></Route>
          <Route path="/listofusers" element={<ListOfUsers/>}></Route>
          <Route path="/updatepw" element={<UpdatePw/>}></Route>
          <Route path="/postarticle" element={<PostArticle/>}></Route>
          <Route path="/addCategory" element={<AddCategory/>}></Route>
          <Route path="/lisofarticles" element={<ListOfArticles/>}></Route>
          <Route path="/article" element={<Article/>}></Route>
        </Routes>
      </ApolloProvider>
    </Router>
  );
}

export default App;
