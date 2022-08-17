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
    <div>
      <SellerHeader />
      <div>
        {orders
        && orders.map((order, i) => (
          <Link key={ i } to={ `/seller/orders/${order.id}` }>
            <div>
              <div
                data-testid={ `seller_orders__element-order-id-${order.id}` }
              >
                Pedido
                {' '}
                {order.id}
              </div>
              <div
                data-testid={ `seller_orders__element-delivery-status-${order.id}` }
              >
                {order.status}
              </div>
              <div>
                <div
                  data-testid={ `seller_orders__element-order-date-${order.id}` }
                >
                  {formatedDate(order.saleDate)}
                </div>
                <div data-testid={ `seller_orders__element-card-price-${order.id}` }>
                  R$
                  {' '}
                  {(order.totalPrice).replace('.', ',')}
                </div>
                <div
                  data-testid={ `seller_orders__element-card-address-${order.id}` }
                >
                  {order.deliveryAddress}
                  ,
                  {order.deliveryNumber}
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
