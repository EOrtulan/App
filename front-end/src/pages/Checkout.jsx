import React from 'react';
import Header from '../components/Header';

function Checkout() {
  const parseProdutos = localStorage.getItem('cart');
  console.log(parseProdutos);
  const produtos = JSON.parse(parseProdutos);

  return (
    <div>
      <div>
        <Header />
      </div>
      <table>
        <thead>
          <th>Item</th>
          <th>Descrição</th>
          <th>Quantidade</th>
          <th>Valor unitario</th>
          <th>Sub-total</th>
          <th>Remover Item</th>
        </thead>
        <tbody>
          {produtos.map((produto, i) => (
            <tr
              key={ produto.id }
            >
              <td
                data-testid={ `customer_checkout__element-order-table-item-number-${i}` }
              >
                {i + 1}
              </td>
              <td
                data-testid={ `customer_checkout__element-order-table-name-${i}` }
              >
                {produto.name}
              </td>
              <td
                data-testid={ `customer_checkout__element-order-table-quantity-${i}` }
              >
                {produto.quantity}
              </td>
              <td
                data-testid={ `customer_checkout__element-order-table-unit-price-${i}` }
              >
                {String(produto.price).replace('.', ',')}
              </td>
              <td
                data-testid={ `customer_checkout__element-order-table-sub-total-${i}` }
              >
                { String(
                  (Number(produto.price) * produto.quantity).toFixed(2),
                ).replace('.', ',') }
              </td>
              <td>
                <button
                  type="button"
                  data-testid={ `customer_checkout__element-order-table-remove-${i}` }
                  value={ produto.id }
                  onClick={ () => removerLinha(target.value) }
                >
                  Remover
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* <div>
        Detalhes e Endereço para Entrega
        <label htmlFor="vendedor">
          P.Vendedor(a) Responsável
          <select
            name="vendedor"
            id="vendedor"
            data-testid="customer_checkout__select-seller"
            value={ seller }
            onChange={ (e) => setSeller({ name: e.target.value, id: e.target.key }) }
          >
            {
              sellers.map((item) => (
                <option key={ item.id }>
                  { item.name }
                </option>
              ))
            }
            <option value="teste">teste</option>
          </select>
        </label>
        <label htmlFor="endereço">
          Endereço
          <input
            id="endereço"
            data-testid="customer_checkout__input-address"
            type="text"
            placeholder="xablau 123"
          />
        </label>
        <label htmlFor="numero">
          Número
          <input
            id="numero"
            data-testid="customer_checkout__input-addressNumber"
            type="text"
          />
        </label>
        <button
          type="button"
          data-testid="customer_checkout__button-submit-order"
          onClick={ sellRegister }
        >
          FINALIZAR PEDIDO
        </button>
      </div> */}
    </div>
  );
}

export default Checkout;
