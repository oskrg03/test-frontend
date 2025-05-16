import React from 'react';
import ReactDOM from 'react-dom/client';
import RootApp from './App.jsx';
import './index.css';
import { ToastProvider } from './contexts/ToastContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ToastProvider>
    <RootApp />
  </ToastProvider>
);
