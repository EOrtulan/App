import React, { useContext, useEffect, useState } from 'react';
import MyContext from '../store';
import { api } from '../service/api';
import Header from '../components/Header';

function Products() {
  const { produtos, setProdutos } = useContext(MyContext);
  const [card, setCard] = useState([]);
  const [inputNumber, setInputNumber] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const { data } = await api.get('/products');
      const newData = data.map((item) => ({ ...item, quantity: 0 }));
      setCard(newData);
      console.log('input', card);
      setProdutos(newData);
      console.log('input', produtos);
      const newDadosInput = data.map((item) => (
        { id: item.id, quantity: 0 }));
      setInputNumber(newDadosInput);
      console.log('input', inputNumber[0]);
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
    console.log(produtos);
  };

  const setQuantidadeMenos = (prod) => {
    if (prod.quantity > 0) {
      const newProducts = [...produtos];
      const index = newProducts.findIndex((item) => item.id === prod.id);
      newProducts[index].quantity -= 1;
      setProdutos(newProducts);
      console.log(produtos);
    }
  };

  const inputQuantidade = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    console.log('input', inputNumber[0]);
    // console.log(inputNumber[name]);
    // setInputNumber([...inputNumber, { inputNumber[name]:value]});
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
                value={ inputNumber[prod.id] }
                min="0"
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
        >
          Ver Carrinho: R$
          { valueCar() }
        </button>
      </div>
    </div>
  );
}

export default Products;
