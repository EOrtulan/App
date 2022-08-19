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
      return String(total.toFixed(2)).replace('.', ',');
    }
  };

  const formatedDate = (date) => {
    const dateSplit = date.split('T', 1).join();
    const newDate = dateSplit.split('-').reverse().join('/');
    return newDate.replace('-', '/');
  };

  return (
    <div className="h-screen w-screen">
      <Header />
      <div className="flex flex-col my-8 mx-20 justify-center">
        <div className="text-2xl">
          Detalhe do Pedido
        </div>
        <div className="shadow-10xl p-4">
          <div className="flex justify-between text-xxl backGroundGreyLogin p-2 mb-2">
            <div
              className="font-bold"
              data-testid="customer_order_details__element-order-details-label-order-id"
            >
              Pedido
              {' '}
              {sale.id}
            </div>
            <div
              data-testid="customer_order_details__element-order-details-label-seller-name"
            >
              Vendedor
            </div>
            <div
              className="font-bold"
              data-testid="customer_order_details__element-order-details-label-order-date"
            >
              {sale.saleDate && (
                formatedDate(sale.saleDate)
              )}
            </div>
            <div
              className="backgroundOrange font-bold rounded-md p-1 uppercase w-48 text-center"
              data-testid="
            customer_order_details__element-order-details-label-delivery-status"
            >
              { sale.status}
            </div>
            <div
              className="primarioBackground text-white rounded-md p-1"
              data-testid="customer_order_details__button-delivery-check"
            >
              MARCAR COMO ENTREGUE
            </div>
          </div>
          <table className="w-full">
            <thead>
              <tr className="text-base grid grid-cols-12">
                <th>Item</th>
                <th className="col-span-6">Descrição</th>
                <th>Quantidade</th>
                <th className="col-span-2">Valor unitario</th>
                <th className="col-span-2">Sub-total</th>
              </tr>
            </thead>
            <tbody>
              {sale.products && sale.products.map((produto, i) => (
                <tr
                  key={ produto.id }
                  className="text-xl grid grid-cols-12"
                  data-testid={
                    `customer_order_details__element-order-table-item-number-${i}`
                  }
                >
                  <td
                    className="p-1 col-span-1 mb-1 text-center secundarioBackground border-solid rounded-l-lg"
                  >
                    {i}
                  </td>
                  <td
                    data-testid={ `customer_order_details__element-order-table-name-${i}` }
                    className="backGroundGreyLogin p-1 pl-4 mb-1 col-span-6"
                  >
                    {produto.name}
                  </td>
                  <td
                    className="primarioBackground flex items-center justify-center text-white p-1 mb-1"
                    data-testid={
                      `customer_order_details__element-order-table-quantity-${i}`
                    }
                  >
                    {produto.quantity}
                  </td>
                  <td
                    className="terciarioBackground flex items-center justify-center text-white p-1 mb-1 col-span-2"
                    data-testid={
                      `customer_order_details__element-order-table-sub-total-${i}`
                    }
                  >
                    R$
                    {' '}
                    { String(produto.price).replace('.', ',')}
                  </td>
                  <td
                    className="quaternarioBackground flex items-center justify-center text-white p-1 mb-1 col-span-2"
                    data-testid={ `customer_order_details__element-order-total-price-${i}` }
                  >
                    R$
                    {' '}
                    {String(
                      (Number(produto.price) * produto.quantity).toFixed(2),
                    ).replace('.', ',') }
                  </td>
                </tr>
              ))}
            </tbody>
            <div
              className="justify-end flex"
              data-testid="customer_order_details__element-order-total-price"
            >
              <div
                className="text-white primarioBackground px-4 py-2 border-solid rounded mt-8"
              >
                Total: R$
                {' '}
                {totalPrice()}
              </div>
            </div>
          </table>
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;
