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
    return total;
  };

  const setQuantidadeMais = (prod) => {
    const newProducts = [...produtos];
    const index = newProducts.findIndex((item) => item.id === prod.id);
    newProducts[index].quantity += 1;
    setProdutos(newProducts);
  };

  const setQuantidadeMenos = (prod) => {
    if (prod.quantity > 0) {
      const newProducts = [...produtos];
      const index = newProducts.findIndex((item) => item.id === prod.id);
      newProducts[index].quantity -= 1;
      setProdutos(newProducts);
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
              <div data-testid={ `customer_products__element-card-price-${prod.id}` }>
                R$
                { Number(prod.price).toFixed(2) }
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
                value={ input[prod.id] ? input[prod.id] : '' }
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
          data-testid="customer_products__button-cart"
          type="button"
          onClick={ () => navigate('/customer/checkout') }
        >
          Ver Carrinho: R$
          { valueCar() }
        </button>
      </div>
    </div>
  );
}

export default Products;
