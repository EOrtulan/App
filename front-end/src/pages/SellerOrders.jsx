import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SellerHeader from '../components/SellerHeader';
import { getOrdersSeller } from '../service/api';

function SellerOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrdersApi = async () => {
      const user = localStorage.getItem('user');
      const { id } = JSON.parse(user);
      const data = await getOrdersSeller(id);
      console.log(data);
      setOrders(data);
    };
    getOrdersApi();
  }, []);

  const formatedDate = (date) => {
    const dateSplit = date.split('T', 1).join();
    const newDate = dateSplit.split('-').reverse().join('/');
    return newDate;
  };

  return (
    <div className="h-screen w-screen">
      <SellerHeader />
      <div className="flex-wrap flex my-8 mx-20 justify-center items-center">
        {orders
        && orders.map((order, i) => (
          <Link key={ i } to={ `/seller/orders/${order.id}` }>
            <div className="flex shadow-10xl my-2 mr-4">
              <div
                data-testid={ `seller_orders__element-order-id-${order.id}` }
                className="flex flex-col p-7 justify-center"
              >
                <div className="text-xs">
                  Pedido
                </div>
                <div className="flex justify-center text-sm">
                  {order.id}
                </div>
              </div>
              <div>
                <div className="backGroundGrey p-1">
                  <div className="flex">
                    <div
                      data-testid={ `seller_orders__element-delivery-status-${order.id}` }
                      className="flex border-solid rounded-md items-center secundarioBackground pl-5 pr-5 text-sm mr-1"
                    >
                      {order.status}
                    </div>
                    <div>
                      <div
                        data-testid={ `seller_orders__element-order-date-${order.id}` }
                        className="w-full items-center border-solid rounded-md justify-center text-sm backGroundTextLight px-5 py-1 mb-1"
                      >
                        {formatedDate(order.saleDate)}
                      </div>
                      <div
                        data-testid={ `seller_orders__element-card-price-${order.id}` }
                        className="flex w-full border-solid rounded-md items-center justify-center text-sm backGroundTextLight px-5 py-1"
                      >
                        R$
                        {' '}
                        {(order.totalPrice).replace('.', ',')}
                      </div>
                    </div>
                  </div>
                  <div
                    data-testid={ `seller_orders__element-card-address-${order.id}` }
                    className="text-right text-sm p-1 border-solid rounded-md"
                  >
                    {order.deliveryAddress}
                    ,
                    {' '}
                    {order.deliveryNumber}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SellerOrders;
