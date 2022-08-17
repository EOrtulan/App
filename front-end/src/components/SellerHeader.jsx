import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function SellerHeader() {
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
        Pedidos
      </Link>
      <span data-testid="customer_products__element-navbar-user-full-name">
        {dataUser}
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

export default SellerHeader;
