import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { getSellers, saleRegister } from '../service/api';

function Checkout() {
  const [sellers, setSellers] = useState([]);
  const [seller, setSeller] = useState([]);
  const [endereco, setEndereco] = useState({});
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const getSllersApi = async () => {
      const data = await getSellers();
      console.log(data);
      setSellers(data);
      const parseProdutos = localStorage.getItem('cart');
      const produtos = JSON.parse(parseProdutos);
      setCart(produtos);
    };
    getSllersApi();
  }, []);

  function removerLinha(id) {
    const newCart = cart.filter((item) => item.id !== Number(id));
    localStorage.removeItem('cart');
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  }

  const totalPrice = () => {
    let total = 0;
    cart.forEach((item) => {
      total += item.price * item.quantity;
    });
    return total;
  };

  async function sellRegister() {
    try {
      const user = getItemLocalStorage('user');
      const { id } = JSON.parse(user);
      const products = cart.map((item) => (
        { userId: item.id, quantity: item.quantity }));
      const register = {
        userId: id,
        sellerId: seller.id,
        products,
        totalPrice: totalPrice(),
        deliveryAddress: endereco.name,
        deliveryNumber: endereco.number,
      };
      await saleRegister(register);
    } catch (err) {
      console.log(err);
    }
  }

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
          {cart && cart.map((produto, i) => (
            <tr
              key={ produto.id }
            >
              <td
                data-testid={ `customer_checkout__element-order-table-item-number-${i}` }
              >
                {produto.id}
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
                  onClick={ (e) => removerLinha(e.target.value) }
                >
                  Remover
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        Total: R$
        <div
          data-testid="customer_checkout__element-order-total-price"
        >
          {totalPrice()}
        </div>
        {' '}
      </div>
      <div>
        Detalhes e Endereço para Entrega
        <label htmlFor="vendedor">
          P.Vendedor(a) Responsável
          <select
            name="vendedor"
            id="vendedor"
            data-testid="customer_checkout__select-seller"
            value={ seller.name }
            onChange={ (e) => setSeller({ name: e.target.value, id: e.target.key }) }
          >
            {/* { sellers
             && sellers.map((item) => (
               <option key={ item.id }>
                 { item.name }
               </option>
             ))} */}
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
            value={ endereco.name }
            onChange={ (e) => setEndereco({ ...endereco, name: e.target.value }) }
          />
        </label>
        <label htmlFor="numero">
          Número
          <input
            value={ endereco.number }
            onChange={ (e) => setEndereco({ ...endereco, number: e.target.value }) }
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
      </div>
    </div>
  );
}

export default Checkout;
