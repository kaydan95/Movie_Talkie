import { BrowserRouter as Router, Routes, Route, Link, Navigate} from "react-router-dom";
import {ApolloClient, InMemoryCache, ApolloProvider} from "@apollo/client";
import {createUploadLink} from "apollo-upload-client";
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
import { createGlobalStyle, ThemeProvider } from 'styled-components';

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Anek+Kannada:wght@300;400;500&family=Lato:wght@300;400;700;900&display=swap');
  font-family: 'Lato', sans-serif;
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, menu, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  main, menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, main, menu, nav, section {
    display: block;
  }
  /* HTML5 hidden-attribute fix for newer browsers */
  *[hidden] {
      display: none;
  }
  menu, ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  *{
    box-sizing: border-box;
  }
  body {
    font-family: 'Anek Kannada', sans-serif;
    line-height: 1;
    font-weight : 400;
    display : flex;
    flex-direction: column;
    letter-spacing: 0.3;
    background-color: ${props => props.theme.base.background};
    /* &::-webkit-scrollbar {
        display : none;
    } */
  }
  a {
    text-decoration: none;
    color : inherit;
  }
`


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
    <>
      <GlobalStyle/>
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



            
            <Route path="/updatepw" element={<UpdatePw/>}></Route>

          </Routes>
        </ApolloProvider>
      </Router>
    </>

  );
}

export default App;
