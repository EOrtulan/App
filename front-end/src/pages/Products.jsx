import React, { useContext, useEffect } from 'react';
import MyContext from '../store';

function Products() {
  const { produtos, setProdutos } = useContext(MyContext);

  const produtosmock = [
    {
      name: 'coca',
      img: 'https://thumbs.dreamstime.com/z/modelo-de-%C3%ADcone-link-cor-preta-edit%C3%A1vel-s%C3%ADmbolo-ilustra%C3%A7%C3%A3o-vetor-plano-para-design-gr%C3%A1fico-e-web-231112760.jpg',
    },
  ];
  useEffect(() => {
    setProdutos(...produtos, { name: 'foi', img: 'umafoto' });
    console.log(produtos);
  }, []);

  useEffect(() => {
    console.log(produtos);
  }, [produtos]);

  return (
    <div>
      <div>
        Produtos
      </div>
      <div>
        { produtosmock && (
          produtosmock.map((prod, i) => (
            <div key={ i }>
              <div>
                {prod.name}
              </div>
              <img
                data-testid="customer_products__button-card-rm-item-<id>"
                src={ prod.img }
                height="50px"
                width="50px"
                alt="foto"
              />
              <button
                data-testid="customer_products__button-card-rm-item-<id>"
                type="button"
              >
                -
              </button>
              <button
                data-testid="customer_products__button-card-add-item-<id>"
                type="button"
              >
                +
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Products;
