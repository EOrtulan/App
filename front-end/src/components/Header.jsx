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
    <div className="flex w-full flex-row">
      <div className="leading-10">
        <Link
          to="/customer/products"
          data-testid="customer_products__element-navbar-link-products"
        >
          Produtos
        </Link>
      </div>
      <div>
        <Link
          to="/customer/orders"
          data-testid="customer_products__element-navbar-link-orders"
        >
          Meus pedidos
        </Link>
      </div>
      <div
        data-testid="customer_products__element-navbar-user-full-name"
      >
        { dataUser }
      </div>
      <div>
        <Link
          to="/login"
          onClick={ () => localStorage.removeItem('user') }
          data-testid="customer_products__element-navbar-link-logout"
        >
          sair
        </Link>
      </div>
    </div>
  );
}

export default Header;
