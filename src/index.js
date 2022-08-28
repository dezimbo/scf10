import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { subscribeUser } from './subscription';
import reportWebVitals from './reportWebVitals';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { indigo, pink, teal } from '@mui/material/colors';
import {
  ruRU
} from '@mui/x-data-grid';

const theme = createTheme(
  {
    palette: {      
      primary: indigo,
    success: teal,
      secondary: pink
    },
    
  },
  ruRU,
);



ReactDOM.render(
  <React.StrictMode>
    
      <ThemeProvider theme={theme}>
      <App />
      </ThemeProvider>
      
  </React.StrictMode>,
  document.getElementById('root')
);
serviceWorkerRegistration.register();
reportWebVitals();
subscribeUser();