import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Header() {
  const [dataUser, setDataUser] = useState();

  const getDataUser = () => {
    const getStorage = localStorage.getItem('user');
    const dataParse = JSON.parse(getStorage);
    setDataUser(dataParse.name);
  };

  useEffect(() => {
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
        to="/customer/orders"
        data-testid="customer_products__element-navbar-link-orders"
      >
        Meus pedidos
      </Link>
      <span
        data-testid="customer_products__element-navbar-user-full-name"
      >
        { dataUser }
      </span>
      <Link
        to="/login"
        onClick={ () => localStorage.removeItem('user') }
        data-testid="customer_products__element-navbar-link-logout"
      >
        sair
      </Link>
    </div>
  );
}

export default Header;
