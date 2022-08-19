import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getOrders } from '../service/api';

function CustomerOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrdersApi = async () => {
      const { sales } = await getOrders();
      setOrders(sales);
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
      <Header />
      <div className="flex-wrap flex my-8 mx-20 justify-center items-center">
        {orders
        && orders.map((order, i) => (
          <Link key={ i } to={ `/customer/orders/${order.id}` }>
            <div
              className="flex shadow-10xl my-2 mr-4"
              data-testid={ `customer_products__element-order-date-${order.id}` }
            >
              <div
                className="flex flex-col p-3 items-center justify-center"
              >
                <div
                  data-testid={ `customer_orders__element-order-id-${order.id}` }
                  className="text-xs"
                >
                  Pedido
                </div>
                <div className="flex justify-center text-sm">
                  {`${order.id}`}
                </div>
              </div>
              <div className="flex p-1 backGroundGrey">
                <div
                  data-testid={ `customer_orders__element-delivery-status-${order.id}` }
                  className="flex border-solid rounded-md items-center secundarioBackground pl-5 pr-5 text-sm mr-1"
                >
                  {order.status}
                </div>
                <div>
                  <div
                    data-testid={ `customer_orders__element-order-date-${order.id}` }
                    className="w-full items-center border-solid rounded-md justify-center text-sm backGroundTextLight px-5 py-1 mb-1"
                  >
                    {formatedDate(order.saleDate)}
                  </div>
                  <div
                    data-testid={ `customer_orders__element-card-price-${order.id}` }
                    className="flex w-full items-center border-solid rounded-md justify-center text-sm backGroundTextLight px-5 py-1"
                  >
                    R$:
                    {' '}
                    {console.log(order.totalPrice)}
                    {(order.totalPrice).replace('.', ',')}
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

export default CustomerOrders;
