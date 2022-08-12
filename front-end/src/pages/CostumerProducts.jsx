import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MyContext from '../store';
import { api } from '../service/api';
import Header from '../components/Header';

function Products() {
  const navigate = useNavigate();
  const { produtos, setProdutos } = useContext(MyContext);
  const [card, setCard] = useState([]);
  const [input, setInput] = useState({});

  useEffect(() => {
    const getProducts = async () => {
      const { data } = await api.get('/products');
      const newData = data.map((item) => ({ ...item, quantity: 0 }));
      let obj = {};
      data.forEach((item) => {
        obj = { ...obj, [item.id]: '0' };
      });
      setInput(obj);
      setCard(newData);
      setProdutos(newData);
    };
    getProducts();
  }, []);

  const valueCar = () => {
    let total = 0;
    produtos.forEach((item) => {
      total += item.quantity * item.price;
    });
    return String(total.toFixed(2)).replace('.', ',');
  };

  const setQuantidadeMais = (prod) => {
    const newProducts = [...produtos];
    const index = newProducts.findIndex((item) => item.id === prod.id);
    newProducts[index].quantity += 1;
    setProdutos(newProducts);
    setInput({ ...input, [prod.id]: newProducts[index].quantity });
  };

  const setQuantidadeMenos = (prod) => {
    if (prod.quantity > 0) {
      const newProducts = [...produtos];
      const index = newProducts.findIndex((item) => item.id === prod.id);
      newProducts[index].quantity -= 1;
      setProdutos(newProducts);
      setInput({ ...input, [prod.id]: newProducts[index].quantity });
    }
  };

  const inputQuantidade = (e) => {
    const { name, value } = e.target;
    const newProducts = [...produtos];
    const index = newProducts.findIndex((item) => item.id === Number(name));
    newProducts[index].quantity = Number(value);
    setProdutos(newProducts);
    const newInput = { ...input, [name]: value };
    setInput(newInput);
  };

  return (
    <div>
      <Header />
      <div>
        { card && (
          card.map((prod, i) => (
            <div key={ i }>
              <div data-testid={ `customer_products__element-card-title-${prod.id}` }>
                {prod.name}
              </div>
              <img
                data-testid={ `customer_products__button-card-rm-item-${prod.id}` }
                src={ prod.urlImage }
                height="50px"
                width="50px"
                alt={ prod.name }
              />
              <div>
                R$
                {' '}
                <span
                  data-testid={ `customer_products__element-card-price-${prod.id}` }
                >
                  { prod.price.replace('.', ',') }
                </span>

              </div>
              <button
                data-testid={ `customer_products__button-card-rm-item-${prod.id}` }
                type="button"
                onClick={ () => setQuantidadeMenos(prod) }
              >
                -
              </button>
              <input
                data-testid={ `customer_products__input-card-quantity-${prod.id}` }
                type="number"
                name={ prod.id }
                value={ input[prod.id] }
                onFocus={ () => setInput({ ...input, [prod.id]: '' }) }
                onChange={ inputQuantidade }
              />
              <button
                data-testid={ `customer_products__button-card-add-item-${prod.id}` }
                type="button"
                onClick={ () => setQuantidadeMais(prod) }
              >
                +
              </button>
            </div>
          ))
        )}
        <button
          type="button"
          onClick={ () => navigate('/customer/checkout') }
        >
          Ver Carrinho: R$
          {' '}
          <span data-testid="customer_products__checkout-bottom-value">
            {valueCar()}
          </span>
        </button>
      </div>
    </div>
  );
}

export default Products;
