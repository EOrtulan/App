import { Route, Routes, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/CostumerProducts';
import MyRequests from './pages/CostumerRequests';
import Checkout from './pages/CostumerCheckout';
import OrderDetails from './pages/CostumerOrderDetails';
import authToken from './utils/authToken';

function AppRoutes({ children }) {
  // function rotaAuth() {
  //   console.log('entrou', authToken());
  //   return authToken() ? (children) : <Navigate to="/login" replace />;
  // }
  return (
    <Routes>
      {/* <Route
        element={ rotaAuth() }
        { ...rest }
        render={ ({ location }) => (
          authToken() ? (children) : (
            <Navigate
              to={ {
                pathname: '/login',
                state: { from: location },
              } }
            />
          )
        ) }
      /> */}
      <Route path="/" element={ <Navigate to="/login" replace /> } />
      <Route path="/login" element={ <Login /> } />
      <Route path="/register" element={ <Register /> } />
      <Route path="/customer/products" element={ <Products /> } />
      <Route path="/myrequests" element={ <MyRequests /> } />
      <Route path="/checkout" element={ <Checkout /> } />
      <Route path="/orderdetails" element={ <OrderDetails /> } />
    </Routes>
  );
}
AppRoutes.propTypes = {
  children: PropTypes.node,
}.isRequire;

export default AppRoutes;
