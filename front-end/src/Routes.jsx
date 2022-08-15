import { Route, Routes, Navigate } from 'react-router-dom';
import Checkout from './pages/Checkout';
import Products from './pages/CostumerProducts';
import Login from './pages/Login';
import Register from './pages/Register';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={ <Navigate to="/login" replace /> } />
      <Route path="/login" element={ <Login /> } />
      <Route path="/register" element={ <Register /> } />
      <Route path="/customer/products" element={ <Products /> } />
      <Route path="/customer/checkout" element={ <Checkout /> } />
    </Routes>
  );
}

export default AppRoutes;
