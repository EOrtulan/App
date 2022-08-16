import { Route, Routes, Navigate } from 'react-router-dom';
import Checkout from './pages/Checkout';
import Products from './pages/CostumerProducts';
import Login from './pages/Login';
import Register from './pages/Register';
import OrderDetails from './pages/CustomerOrdersDetails';
import CustomerOrders from './pages/CustomerOrders';
import SellerOrders from './pages/SellerOrders';
import SellerOrderDetails from './pages/SellerOrderDetails';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={ <Navigate to="/login" replace /> } />
      <Route path="/login" element={ <Login /> } />
      <Route path="/register" element={ <Register /> } />
      <Route path="/customer/products" element={ <Products /> } />
      <Route path="/customer/checkout" element={ <Checkout /> } />
      <Route path="/customer/orders" element={ <CustomerOrders /> } />
      <Route path="/customer/orders/:id" element={ <OrderDetails /> } />
      <Route path="/seller/orders" element={ <SellerOrders /> } />
      <Route path="/seller/orders/:id" element={ <SellerOrderDetails /> } />
    </Routes>
  );
}

export default AppRoutes;
