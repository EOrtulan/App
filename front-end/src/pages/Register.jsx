import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../service/api';
import dataValidator from '../utils';

function Register() {
  const navigate = useNavigate();
  const [errorRegister, setErrorRegister] = useState(false);
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });

  const buttonRegister = async () => {
    try {
      await register(user.name, user.email, user.password);

      navigate('/customer/products');
    } catch (err) {
      setErrorRegister(true);
    }
  };

  return (
    <div>
      <div>
        <label htmlFor="name">
          Nome
          <input
            id="name"
            type="text"
            name="name"
            value={ user.name }
            onChange={ (e) => setUser({
              ...user,
              name: e.target.value }) }
            data-testid="common_register__input-name"
          />
        </label>
      </div>
      <div>
        <label htmlFor="email">
          Email:
          <input
            id="email"
            type="text"
            name="email"
            value={ user.email }
            onChange={ (e) => setUser({
              ...user,
              email: e.target.value }) }
            data-testid="common_register__input-email"
          />
        </label>
      </div>
      <div>
        <label htmlFor="password">
          Senha:
          <input
            id="password"
            type="password"
            name="password"
            value={ user.password }
            onChange={ (e) => setUser({
              ...user,
              password: e.target.value }) }
            data-testid="common_register__input-password"
          />
        </label>
      </div>
      <div>
        <button
          type="button"
          data-testid="common_register__button-register"
          disabled={ dataValidator(user.email, user.password, user.name) }
          onClick={ buttonRegister }
        >
          Cadastrar
        </button>
      </div>
      {
        errorRegister
        && (
          <alert data-testid="common_register__element-invalid_register">
            Email ou nome já existente
          </alert>
        )
      }
    </div>
  );
}

export default Register;
