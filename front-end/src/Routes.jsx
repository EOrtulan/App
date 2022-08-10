import { Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import MyRequests from './pages/MyRequests';
import Checkout from './pages/Checkout';
import OrderDetails from './pages/OrderDetails';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={ <Navigate to="/login" replace /> } />
      <Route path="/login" element={ <Login /> } />
      <Route path="/register" element={ <Register /> } />
      <Route path="/products" element={ <Products /> } />
      <Route path="/myrequests" element={ <MyRequests /> } />
      <Route path="/checkout" element={ <Checkout /> } />
      <Route path="/orderdetails" element={ <OrderDetails /> } />
    </Routes>
  );
}

export default AppRoutes;
