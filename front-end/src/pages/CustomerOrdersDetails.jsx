import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import { getOrdersId } from '../service/api';

function OrderDetails() {
  const params = useParams();
  const [sale, setSale] = useState([]);
  // const [verify, setVerify] = useState(false);
  const getProductsSale = localStorage.getItem('sale');
  const products = JSON.parse(getProductsSale);

  const requestApi = async () => {
    const sales = await getOrdersId(params.id);
    const date = sales.saleDate.split('T', 1).join();
    const newDate = date.split('-').reverse().join('-');
    const formatedSaleDate = { ...sales,
      saleDate: newDate };
    setSale(formatedSaleDate);
  };

  useEffect(() => {
    requestApi();
  }, []);

  const totalPrice = () => {
    let total = 0;
    products.forEach((item) => {
      total += item.price * item.quantity;
    });
    return String(total.toFixed(2)).replace('.', ',');
  };

  return (
    <div>
      <div>
        <Header />
      </div>
      <h3>Detalhe do Pedido</h3>
      <div>
        <p data-testid="customer_order_details__element-order-details-label-order-id">
          {`Pedido: ${sale.id}`}
        </p>
        <p data-testid="customer_order_details__element-order-details-label-seller-name">
          Vendedor(a): Fulana Pereira
        </p>
        <p
          data-testid="customer_order_details__element-order-details-label-order-date"
        >
          {sale.saleDate}
        </p>
        <p
          data-testid="
          customer_order_details__element-order-details-label-delivery-status"
        >
          {sale.status}
        </p>
        <button
          data-testid="customer_order_details__button-delivery-check"
          type="button"
          // disabled={ verify }
        >
          Marcar como entregue
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor unitario</th>
            <th>Sub-total</th>
          </tr>
        </thead>
        <tbody>
          {products.map((produto, i) => (
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
      </table>
      <p
        data-testid="customer_order_details__element-order-total-price"
      >
        {`Total: R$ ${totalPrice()}`}
      </p>
    </div>
  );
}

// OrderDetails.propTypes = {
//   params: PropTypes.Object.isRequired,
// };

export default OrderDetails;
