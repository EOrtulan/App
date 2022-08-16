import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { getSellers, saleRegister } from '../service/api';

function Checkout() {
  const navigate = useNavigate();
  const [seller, setSeller] = useState({});
  const [sellers, setSellers] = useState([]);
  const [endereco, setEndereco] = useState({});
  const [cart, setCart] = useState([]);

  const getSellersApi = async () => {
    const data = await getSellers();
    setSellers(data);
    const parseProdutos = localStorage.getItem('cart');
    const produtos = JSON.parse(parseProdutos);
    setCart(produtos);
  };

  useEffect(() => {
    getSellersApi();
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
    return String(total.toFixed(2)).replace('.', ',');
  };

  const changeSelect = ({ target }) => {
    const newSeller = sellers.find((item) => item.name === target.value);
    setSeller(newSeller);
  };

  async function sellRegister() {
    try {
      const user = localStorage.getItem('user');
      const { id } = JSON.parse(user);
      const products = cart.map((item) => (
        { productId: item.id, quantity: item.quantity }));
      const register = {
        userId: id,
        sellerId: seller.id,
        products,
        totalPrice: totalPrice().replace(',', '.'),
        deliveryAddress: endereco.name,
        deliveryNumber: endereco.number,
      };
      console.log(register);
      await saleRegister(register);
      const registerOrder = await saleRegister(register);
      navigate(`/customer/orders/${registerOrder.id}`);
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
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor unitario</th>
            <th>Sub-total</th>
            <th>Remover Item</th>
          </tr>
        </thead>
        <tbody>
          {cart && cart.map((produto, i) => (
            <tr
              key={ i + 1 }
            >
              <td
                data-testid={ `customer_checkout__element-order-table-item-number-${i}` }
              >
                { i + 1}
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
            id="vendedor"
            data-testid="customer_checkout__select-seller"
            value={ seller.name }
            onChange={ changeSelect }
          >
            { sellers
             && sellers.map((item) => (
               <option name={ item.id } key={ item.id }>
                 { item.name }
               </option>
             ))}
            <option>{ seller.name }</option>
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
