import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SellerHeader from '../components/SellerHeader';
import { getOrdersId, updateState } from '../service/api';

function SellerOrderDetails() {
  const params = useParams();
  const [sale, setSales] = useState([]);
  const [preparar, setPreparar] = useState(true);
  const [saiu, setSaiu] = useState(false);

  useEffect(() => {
    const requestApi = async () => {
      const data = await getOrdersId(params.id);
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

  const changeStatus = async (status) => {
    await updateState(params.id, status);
    const data = await getOrdersId(params.id);
    setSales(data);

    if (status === 'Preparando' || status === 'Em Trânsito' || status === 'Entregue') {
      setPreparar(false);
    } else {
      setSaiu(t);
    }
  };

  return (
    <div>
      <div>
        <SellerHeader />
      </div>
      Detalhe do Pedido
      <div>
        <div
          data-testid="seller_order_details__element-order-details-label-order-id"
        >
          Pedido
          {' '}
          {sale.id}
        </div>
        <div
          data-testid="seller_order_details__element-order-details-label-order-date"
        >
          {sale.saleDate}
        </div>
        <div
          data-testid="
          seller_order_details__element-order-details-label-delivery-status"
        >
          { sale.status}
        </div>
        <button
          type="button"
          name={ sale.status }
          data-testid="seller_order_details__button-preparing-check"
          onClick={ (e) => changeStatus(e.target.name) }
          disabled={ saiu }

        >
          PREPARAR PEDIDO
        </button>
        <button
          type="button"
          name="Em Trânsito"
          data-testid="seller_order_details__button-dispatch-check"
          onClick={ (e) => changeStatus(e.target.name) }
          disabled={ preparar }
        >
          SAIU PARA ENTREGA
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
                  `seller_order_details__element-order-table-item-number-${i}`
                }
              >
                {i + 1}

              </td>
              <td
                data-testid={ `seller_order_details__element-order-table-name-${i}` }
              >
                {produto.name}
              </td>
              <td
                data-testid={
                  `seller_order_details__element-order-table-quantity-${i}`
                }
              >
                {produto.quantity}
              </td>
              <td
                data-testid={
                  `seller_order_details__element-order-table-unit-price-${i}`
                }
              >
                { String(produto.price).replace('.', ',')}
              </td>
              <td
                data-testid={ `seller_order_details__element-order-table-sub-total-${i}` }
              >
                {String(
                  (Number(produto.price) * produto.quantity).toFixed(2),
                ).replace('.', ',') }
              </td>
            </tr>
          ))}
        </tbody>
        <div
          data-testid="seller_order_details__element-order-total-price"
        >
          Total: R$
          {totalPrice()}
        </div>
      </table>
    </div>
  );
}

export default SellerOrderDetails;
