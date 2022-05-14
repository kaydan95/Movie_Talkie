import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { theme } from './Styles/theme';
import {ApolloClient, InMemoryCache, ApolloProvider} from "@apollo/client";
import {createUploadLink} from "apollo-upload-client";


const BASE_URL:string = "/graphql";

const link = createUploadLink({
  uri : BASE_URL,
  credentials : 'include'
});

const client = new ApolloClient({
  link : link,
  cache : new InMemoryCache(),
});

ReactDOM.render(
    <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <App/>
      </ApolloProvider>
    </ThemeProvider>,
  document.getElementById('root')
);


reportWebVitals();
