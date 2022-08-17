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
    const newDate = dateSplit.split('-').reverse().join('-');
    return newDate;
  };

  return (
    <div>
      <Header />
      <div>
        {orders
        && orders.map((order, i) => (
          <Link key={ i } to={ `/customer/orders/${order.id}` }>
            <div
              data-testid={ `customer_products__element-order-date-${order.id}` }
            >
              <p
                data-testid={ `customer_orders__element-order-id-${order.id}` }
              >
                {`Pedido: ${order.id}`}
              </p>
              <p
                data-testid={ `customer_orders__element-card-price-${order.id}` }
              >
                {order.status}
              </p>
              <p
                data-testid={ `customer_orders__element-order-date-${order.id}` }
              >
                {`Data: ${formatedDate(order.saleDate)}`}
              </p>
              <span>
                R$:
                {' '}
              </span>
              <span
                data-testid={ `customer_orders__element-card-price-${order.id}` }
              >
                {(order.totalPrice).replace('.', ',')}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CustomerOrders;
