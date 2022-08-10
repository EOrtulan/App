import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import AppRoutes from './Routes';
import MyProvider from './store/Provider';

function App() {
  return (
    <BrowserRouter>
      <MyProvider>
        <AppRoutes />
      </MyProvider>
    </BrowserRouter>
  );
}
export default App;
