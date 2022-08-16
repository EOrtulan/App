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
              <div
                data-testid={ `customer_orders__element-order-id-${order.id}` }
              >
                <div>Pedido</div>
                <div>{order.id}</div>
              </div>
              <div
                data-testid={ `customer_orders__element-card-price-${order.id}` }
              >
                {order.status}
              </div>
              <div>
                <div
                  data-testid={ `customer_orders__element-order-date-${order.id}` }
                >
                  {order.saleDate}
                </div>
                <div>
                  R$
                  <div
                    data-testid={ `customer_orders__element-card-price-${order.id}` }
                  >
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
