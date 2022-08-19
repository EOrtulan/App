import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProducts } from '../service/api';
import Header from '../components/Header';

function Products() {
  const navigate = useNavigate();
  const [produtos, setProdutos] = useState([]);
  const [input, setInput] = useState({});

  const listProducts = async () => {
    const data = await getProducts();
    const newData = data.map((item) => ({ ...item, quantity: 0 }));
    let obj = {};
    data.forEach((item) => {
      obj = { ...obj, [item.id]: '0' };
    });
    setInput(obj);
    setProdutos(newData);
  };

  useEffect(() => {
    listProducts();
  }, []);

  const checkout = () => {
    console.log('checkout cart', produtos);
    localStorage.setItem('cart', JSON.stringify(produtos));
    navigate('/customer/checkout');
  };

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
    const newProducts = [...produtos];
    const index = newProducts.findIndex((item) => item.id === prod.id);

    newProducts[index].quantity -= 1;
    setProdutos(newProducts);
    setInput({ ...input, [prod.id]: newProducts[index].quantity });
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
    <div
      className="h-screen w-screen"
    >
      <Header />
      <div className="flex flex-wrap my-8 mx-20 justify-center items-center">
        { produtos && (
          produtos.map((prod, i) => (
            <div
              className="shadow-10xl flex flex-col
               items-center justify-center h-52 w-52 mr-4 mb-8"
              key={ i }
            >
              <div
                className="absolute flex p-1
                border-solid rounded-md backGroundTextLight ColorTextDark mb-42 mr-32"
              >
                R$
                {' '}
                <span
                  data-testid={ `customer_products__element-card-price-${prod.id}` }
                >
                  { prod.price.replace('.', ',') }
                </span>
              </div>
              <div className="w-44 h-44">
                <img
                  data-testid={ `customer_products__img-card-bg-image-${prod.id}` }
                  src={ prod.urlImage }
                  alt={ prod.name }
                />
              </div>
              <div
                className="flex flex-col justify-center
               items-center w-full backGroundGrey pt-1 pb-4"
              >
                <div
                  className="text-sm"
                  data-testid={ `customer_products__element-card-title-${prod.id}` }
                >
                  {prod.name}
                </div>
                <div className="flex items-center justify-center w-full">
                  <div className="w-6 primarioBackground border-solid rounded-l-lg">
                    <button
                      className="w-full h-full"
                      data-testid={ `customer_products__button-card-rm-item-${prod.id}` }
                      type="button"
                      onClick={ () => {
                        if (prod.quantity > 0) setQuantidadeMenos(prod);
                      } }
                    >
                      -
                    </button>

                  </div>
                  <div className="w-8">
                    <input
                      className="w-full border-solid border-1
                      border-black flex justify-center pl-px9 h-6"
                      data-testid={ `customer_products__input-card-quantity-${prod.id}` }
                      type="number"
                      name={ prod.id }
                      value={ input[prod.id] }
                      onFocus={ () => setInput({ ...input, [prod.id]: '' }) }
                      onChange={ inputQuantidade }
                    />
                  </div>
                  <div className="w-6 primarioBackground border-solid rounded-r-lg">
                    <button
                      className="w-full h-full"
                      data-testid={ `customer_products__button-card-add-item-${prod.id}` }
                      type="button"
                      onClick={ () => setQuantidadeMais(prod) }
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
        <div
          className="p-2 fixed mb-20 ml-ml75
        primarioBackground text-white border-solid rounded-md"
        >
          {produtos && (
            <button
              type="button"
              onClick={ () => checkout() }
              data-testid="customer_products__button-cart"
              disabled={ valueCar() === '0,00' }
            >
              Ver Carrinho: R$
              {' '}
              <span data-testid="customer_products__checkout-bottom-value">
                {valueCar()}
              </span>
            </button>
          )}

        </div>
      </div>
    </div>
  );
}

export default Products;
