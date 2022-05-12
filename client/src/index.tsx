import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { theme } from './Styles/theme';

ReactDOM.render(
    <ThemeProvider theme={theme}>
      <App/>
    </ThemeProvider>,
  document.getElementById('root')
);


reportWebVitals();
