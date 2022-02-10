import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { red, green, cyan, indigo, amber, orange, blueGrey, lime, pink, teal } from '@mui/material/colors';
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();