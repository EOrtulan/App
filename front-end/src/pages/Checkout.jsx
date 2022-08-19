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
      console.log(totalPrice());
      localStorage.setItem('sale', JSON.stringify(cart));
      const registerOrder = await saleRegister(register, token);
      navigate(`/customer/orders/${registerOrder.id}`);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div
      className="h-screen w-screen"
    >
      <Header />
      <div className="flex flex-col my-8 mx-20 justify-center">
        <div className="text-2xl">
          Finalizar Pedido
        </div>
        <div className="shadow-10xl p-4">
          <table className="w-full">
            <thead>
              <tr className="text-base grid grid-cols-12">
                <th>Item</th>
                <th className="col-span-7">Descrição</th>
                <th>Quantidade</th>
                <th>Valor unitario</th>
                <th>Sub-total</th>
                <th>Remover Item</th>
              </tr>
            </thead>
            <tbody>
              {cart && cart.map((produto, i) => (
                <tr
                  className="text-xl grid grid-cols-12"
                  key={ i + 1 }
                >
                  <td
                    className="p-1 col-span-1 mb-1 text-center secundarioBackground border-solid rounded-l-lg"
                    data-testid={ `customer_checkout__element-order-table-item-number-${i}` }
                  >
                    { i + 1}
                  </td>
                  <td
                    className="backGroundGreyLogin p-1 pl-4 mb-1 col-span-7"
                    data-testid={ `customer_checkout__element-order-table-name-${i}` }
                  >
                    {produto.name}
                  </td>
                  <td
                    className="primarioBackground flex items-center justify-center text-white p-1 mb-1 "
                    data-testid={ `customer_checkout__element-order-table-quantity-${i}` }
                  >
                    {produto.quantity}
                  </td>
                  <td
                    className="terciarioBackground flex items-center justify-center text-white p-1 mb-1"
                    data-testid={ `customer_checkout__element-order-table-unit-price-${i}` }
                  >
                    {String(produto.price).replace('.', ',')}
                  </td>
                  <td
                    className="quaternarioBackground flex items-center justify-center text-white p-1 mb-1"
                    data-testid={ `customer_checkout__element-order-table-sub-total-${i}` }
                  >
                    { String(
                      (Number(produto.price) * produto.quantity).toFixed(2),
                    ).replace('.', ',') }
                  </td>
                  <td
                    className="secundarioBackground flex items-center justify-center text-white p-1 mb-1 border-solid rounded-r-lg"
                  >
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
          <div className="justify-end flex">
            <div
              className="text-white primarioBackground px-4 py-2 border-solid rounded mt-8"
              data-testid="customer_checkout__element-order-total-price"
            >
              Total: R$
              {totalPrice()}
            </div>
          </div>
        </div>
        <div className="text-2xl mt-8">Detalhes e Endereço para Entrega</div>
        <div className="shadow-10xl p-4 mb-12">
          <form>
            <div className="flex w-full justify-center items-center">
              <div className="w-2/6">
                <div>
                  P. Vendedor(a) Responsável
                </div>
                <div className="w-full">
                  <select
                    id="vendedor"
                    data-testid="customer_checkout__select-seller"
                    className="border-solid border-1 w-full
                    border-black rounded pl-4 h-11"
                    value="Fulana Pereira"
                  >
                    <option>Fulana Pereira</option>
                  </select>
                </div>
              </div>
              <div className="m-5 w-3/5">
                <div>
                  Endereço
                </div>
                <div className="">
                  <input
                    id="addres"
                    name="address"
                    className="border-solid border-1 w-full
                    border-black h-11 rounded pl-4"
                    data-testid="customer_checkout__input-address"
                    type="text"
                    onChange={ (e) => setAdress(e.target.value) }
                  />
                </div>
              </div>
              <div>
                <div>
                  Número
                </div>
                <div className="w-4/4">
                  <input
                    id="number"
                    name="number"
                    className="border-solid border-1
                    border-black w-full h-11 rounded pl-4"
                    data-testid="customer_checkout__input-addressNumber"
                    type="text"
                    onChange={ (e) => setNumber(e.target.value) }
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <button
                type="button"
                data-testid="customer_checkout__button-submit-order"
                className="border-solid border-1 border-black p-4
             cursor-pointer w-60 leading-8 rounded-md text-white primarioBackground"
                onClick={ () => sellRegister() }
              >
                FINALIZAR PEDIDO
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
