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
    <div className="flex w-full flex-row">
      <div className="leading-10 basis-1/4 flex justify-center secundarioBackground p-1">
        <Link
          to="/customer/products"
          data-testid="customer_products__element-navbar-link-products"
        >
          Pedidos
        </Link>
      </div>
      <div className="leading-10 basis-2/4 primarioBackground pl-10 p-1" />
      <div
        className="leading-10 basis-1/4 p-1
        flex justify-center colorTextLight terciarioBackground"
        data-testid="customer_products__element-navbar-user-full-name"
      >
        {dataUser}
      </div>
      <div
        className="leading-10 basis-1/12
         flex justify-center basis-2/12 p-1 quaternarioBackground"
      >
        <Link
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

export default SellerHeader;
