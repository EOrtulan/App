import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import { getOrdersId } from '../service/api';

function OrderDetails() {
  const params = useParams();
  const [sale, setSales] = useState({});

  useEffect(() => {
    const requestApi = async () => {
      const data = await getOrdersId(params.id);
      console.log(data.products);
      setSales(data);
    };
    requestApi();
  }, []);

  const totalPrice = () => {
    if (sale.products) {
      let total = 0;
      sale.products.forEach((item) => {
        total += item.price * item.quantity;
      });
      return String(total).replace('.', ',');
    }
  };

  return (
    <div>
      { console.log(sale) }
      <div>
        <Header />
      </div>
      Detalhe do Pedido
      <div>
        <div
          data-testid="customer_order_details__element-order-details-label-order-id"
        >
          Pedido
          {' '}
          {sale.id}
        </div>
        <div
          data-testid="customer_order_details__element-order-details-label-seller-name"
        >
          P.Vend:
        </div>
        <div
          data-testid="customer_order_details__element-order-details-label-order-date"
        >
          {sale.saleDate}
        </div>
        <div
          data-testid="
            customer_order_details__element-order-details-label-delivery-status"
        >
          { sale.status}
        </div>
        <button
          type="button"
          data-testid="customer_order_details__button-delivery-check"
        >
          MARCAR COMO ENTREGUE
        </button>
      </div>
      <table>
        <thead>
          <th>Item</th>
          <th>Descrição</th>
          <th>Quantidade</th>
          <th>Valor unitario</th>
          <th>Sub-total</th>
        </thead>
        <tbody>
          {sale.products && sale.products.map((produto, i) => (
            <tr
              key={ produto.id }
            >
              <td
                data-testid={
                  `customer_order_details__element-order-table-item-number-${i}`
                }
              >
                {i + 1}

              </td>
              <td
                data-testid={ `customer_order_details__element-order-table-name-${i}` }
              >
                {produto.name}
              </td>
              <td
                data-testid={
                  `customer_order_details__element-order-table-quantity-${i}`
                }
              >
                {produto.quantity}
              </td>
              <td
                data-testid={
                  `customer_order_details__element-order-table-sub-total-${i}`
                }
              >
                { String(produto.price).replace('.', ',')}
              </td>
              <td
                data-testid={ `customer_order_details__element-order-total-price-${i}` }
              >
                {String(
                  (Number(produto.price) * produto.quantity).toFixed(2),
                ).replace('.', ',') }
              </td>
            </tr>
          ))}
        </tbody>
        <div
          data-testid="customer_order_details__element-order-total-price"
        >
          Total: R$
          {String(totalPrice().toFixed(2)).replace('.', ',')}
        </div>
      </table>
    </div>
  );
}

export default OrderDetails;
