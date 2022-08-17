import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { saleRegister } from '../service/api';

function Checkout() {
  const navigate = useNavigate();
  const [adress, setAdress] = useState('x');
  const [number, setNumber] = useState(0);
  const [cart, setCart] = useState([]);
  const [token, setToken] = useState('');

  const getSellersApi = async () => {
    const parseProdutos = localStorage.getItem('cart');
    const produtos = JSON.parse(parseProdutos);
    const filter = produtos.filter((prod) => prod.quantity > 0);
    setCart(filter);
  };

  useEffect(() => {
    const parseUser = localStorage.getItem('user');
    const user = JSON.parse(parseUser);
    setToken(user.token);
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

  async function sellRegister() {
    try {
      const user = localStorage.getItem('user');
      const { id } = JSON.parse(user);
      const products = cart.map((item) => (
        { productId: item.id, quantity: item.quantity }));
      const register = {
        userId: id,
        sellerId: 2,
        products,
        totalPrice: totalPrice().replace(',', '.'),
        deliveryAddress: adress,
        deliveryNumber: number,
      };
      localStorage.setItem('sale', JSON.stringify(cart));
      const registerOrder = await saleRegister(register, token);
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
      <form>
        Detalhes e Endereço para Entrega
        <label htmlFor="vendedor">
          P.Vendedor(a) Responsável
          <select
            id="vendedor"
            data-testid="customer_checkout__select-seller"
            value="Fulana Pereira"
          >
            <option>Fulana Pereira</option>
          </select>
        </label>
        <label htmlFor="address">
          Endereço
          <input
            id="addres"
            name="address"
            data-testid="customer_checkout__input-address"
            type="text"
            onChange={ (e) => setAdress(e.target.value) }
          />
        </label>
        <label htmlFor="number">
          Número
          <input
            id="number"
            name="number"
            data-testid="customer_checkout__input-addressNumber"
            type="text"
            onChange={ (e) => setNumber(e.target.value) }
          />
        </label>
        <button
          type="button"
          data-testid="customer_checkout__button-submit-order"
          onClick={ sellRegister }
        >
          FINALIZAR PEDIDO
        </button>
      </form>
    </div>
  );
}

export default Checkout;
