import React, { useContext, useEffect, useState } from 'react';
import MyContext from '../store';
import { api } from '../service/api';
import Header from '../components/Header';

function Products() {
  const { produtos, setProdutos } = useContext(MyContext);
  const [ card, setCard ] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const { data } = await api.get('/products');
      setCard(data);
    };
    getProducts();
  }, []);

  const setQuantidadeMais = (prod) => {
    // let quantidade = 0;
    setProdutos([...produtos, { ...prod, quantidade: prod.quantidade += 1 }]);
    console.log(produtos);
    console.log(prod);
  };

  const setQuantidadeMenos = (prod) => {
    console.log(prod);
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
                maxLength="10px"
                data-testid={ `customer_products__input-card-quantity-${prod.id}` }
                type="text"
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
        </button>
      </div>
    </div>
  );
}

export default Products;