import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { getSales } from '../service/api';

function Details() {
  const [sale, setSales] = useState([]);
  useEffect(() => {
    const request = async () => {
      const response = await getSales();
      const { sales } = response;
      setSales(sales);
    };
    request();
  }, []);

  return (
    <div>
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
          {sale[0].id}
        </div>
        <div
          data-testid="customer_order_details__element-order-details-label-seller-name"
        >
          vendedor
        </div>
        <div
          data-testid="customer_order_details__element-order-details-label-order-date"
        >
          {sale[0].saleDate}
        </div>
        <div
          data-testid="
            customer_order_details__element-order-details-label-delivery-status"
        >
          { sale[0].status}
        </div>
        <div
          data-testid="customer_order_details__button-delivery-check"
        >
          check
        </div>
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
          {/* {produtos.map((produto, i) => (
            <tr
              key={ produto.id }
              data-testid={
                `customer_order_details__element-order-table-item-number-${i}`
              }
            >
              <td>{i}</td>
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
                {produto.quantidade}
              </td>
              <td
                data-testid={
                  `customer_order_details__element-order-table-sub-total-${i}`
                }
              >
                {produto.price}
              </td>
              <td
                data-testid={ `customer_order_details__element-order-total-price-${i}` }
              >
                {Number(produto.price) * produto.quantidade}
              </td>
            </tr>
          ))} */}
        </tbody>
        <div
          data-testid="customer_order_details__element-order-total-price"
        >
          Total: R$
          {String(sale[0].totalPrice).replace('.', ',')}
        </div>
      </table>
    </div>
  );
}

export default Details;
