import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import {ApolloClient, InMemoryCache, ApolloProvider} from "@apollo/client";

import './App.css';
import CreateUser from './Components/CreateUser';
import ListOfUsers from './Components/ListOfUsers';
import UpdatePw from './Components/UpdatePw';
import Banner from './Components/Banner';
import Main from './Components/Main';

function App() {
  const client = new ApolloClient({
    uri : 'http://localhost:3001/graphql',

    cache : new InMemoryCache(),
  });

  return (
    <Router>
      <ApolloProvider client={client}>
        <Banner/>
        <Routes>
          <Route path="/" element={<Main/>}></Route>
          <Route path="/createuser" element={<CreateUser/>}></Route>
          <Route path="/listofusers" element={<ListOfUsers/>}></Route>
          <Route path="/updatepw" element={<UpdatePw/>}></Route>
        </Routes>
        <div>THIs is the Footer</div>
      </ApolloProvider>
    </Router>
  );
}

export default App;
