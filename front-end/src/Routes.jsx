import { Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/CostumerProducts';
import MyRequests from './pages/CostumerRequests';
import Checkout from './pages/Checkout';
import OrderDetails from './pages/CostumerOrderDetails';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={ <Navigate to="/login" replace /> } />
      <Route path="/login" element={ <Login /> } />
      <Route path="/register" element={ <Register /> } />
      <Route path="/customer/products" element={ <Products /> } />
      <Route path="/customer/checkout" element={ <Checkout /> } />
      <Route path="/customer/orders" element={ <MyRequests /> } />
      <Route path="/customer/orders/:id" element={ <OrderDetails /> } />
    </Routes>
  );
}

export default AppRoutes;
