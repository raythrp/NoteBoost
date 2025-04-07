import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './assets/css/global.css';
import { NoteProvider } from './contexts/NoteContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <NoteProvider>
        <App />
      </NoteProvider>
    </BrowserRouter>
  </React.StrictMode>
);
