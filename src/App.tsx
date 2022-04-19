import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import {ApolloClient, InMemoryCache, ApolloProvider} from "@apollo/client";
import {createUploadLink} from "apollo-upload-client";

import './App.css';
import CreateUser from './Components/CreateUser';
import ListOfUsers from './Components/ListOfUsers';
import UpdatePw from './Components/UpdatePw';
import Banner from './Components/Banner';
import Main from './Components/Main';
import PostArticle from './Components/PostArticle';
import AddCategory from './Components/AddCategory';
import ListOfArticles from './Components/ListOfArticles';
import Article from './Components/Article';
import MovieSearchResult from './Components/MovieSearchResult';

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
        <Banner/>
        <Routes>
          <Route path="/" element={<Main/>}></Route>
          <Route path="/moviesearch" element={<MovieSearchResult/>}></Route>
          <Route path="/createuser" element={<CreateUser/>}></Route>
          <Route path="/listofusers" element={<ListOfUsers/>}></Route>
          <Route path="/updatepw" element={<UpdatePw/>}></Route>
          <Route path="/postarticle" element={<PostArticle/>}></Route>
          <Route path="/addCategory" element={<AddCategory/>}></Route>
          <Route path="/lisofarticles" element={<ListOfArticles/>}></Route>
          <Route path="/article" element={<Article/>}></Route>
        </Routes>
        <div>THIs is the Footer</div>
      </ApolloProvider>
    </Router>
  );
}

export default App;
