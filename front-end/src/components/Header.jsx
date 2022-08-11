import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { removeItemLocalStorage } from '../service/helpers';
import authToken from '../utils/authToken';

function Header() {
  const [dataUser, setDataUser] = useState({});

  const getDataUser = () => {
    const getStorage = localStorage.getItem('user');
    const dataParse = JSON.parse(getStorage);
    setDataUser(dataParse);
  };

  useEffect(() => {
    console.log('routes', authToken());
    getDataUser();
  }, []);

  return (
    <div>
      <Link
        to="/customer/products"
        data-testid="customer_products__element-navbar-link-products"
      >
        Produtos
      </Link>
      <Link
        to="/myrequests"
        data-testid="customer_products__element-navbar-link-orders"
      >
        Meus pedidos
      </Link>
      <span
        data-testid="customer_products__element-navbar-user-full-name"
      >
        {dataUser.name}
      </span>
      <Link
        to="/login"
        onClick={ () => removeItemLocalStorage('user') }
        data-testid="customer_products__element-navbar-link-logout"
      >
        sair
      </Link>
    </div>
  );
}

export default Header;
