import { Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/CostumerProducts';
import MyRequests from './pages/CostumerRequests';
import Checkout from './pages/Checkout';
import OrderDetails from './pages/CostumerOrderDetails';
import Private from './components/Private';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={ <Navigate to="/login" replace /> } />
      <Route path="/login" element={ <Private Item={ Login } Login="login" /> } />
      <Route path="/register" element={ <Register /> } />
      <Route path="/customer/products" element={ <Private Item={ Products } /> } />
      <Route path="/myrequests" element={ <MyRequests /> } />
      <Route path="/checkout" element={ <Checkout /> } />
      <Route path="/orderdetails" element={ <OrderDetails /> } />
    </Routes>
  );
}

export default AppRoutes;
