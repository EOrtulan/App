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
      <div className="leading-10 basis-1/4 flex justify-center secundarioBackground p-1">
        <Link
          className="ColorTextDark"
          to="/customer/products"
          data-testid="customer_products__element-navbar-link-products"
        >
          Produtos
        </Link>
      </div>
      <div className="leading-10 basis-2/4 primarioBackground pl-10 p-1">
        <Link
          className="colorTextLight"
          to="/customer/orders"
          data-testid="customer_products__element-navbar-link-orders"
        >
          Meus pedidos
        </Link>
      </div>
      <div
        className="leading-10 basis-1/4 p-1
         flex justify-center colorTextLight terciarioBackground"
        data-testid="customer_products__element-navbar-user-full-name"
      >
        { dataUser }
      </div>
      <div className="leading-10 basis-1/12 flex justify-center basis-2/12 p-1 quaternarioBackground">
        <Link
          className="colorTextLight"
          to="/login"
          onClick={ () => localStorage.removeItem('user') }
          data-testid="customer_products__element-navbar-link-logout"
        >
          Sair
        </Link>
      </div>
    </div>
  );
}

export default Header;
