import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import login from '../service/api';

function LoginPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const [data, setData] = useState({});

  async function onSubmitButton() {
    const response = await login(user.email, user.password);
    setData(response);
    if (response.token) {
      if (response.role === 'administrator') {
        navigate('/admin/manage');
      }
      if (response.role === 'seller') {
        navigate('/seller/orders');
      }
      if (response.role === 'customer') {
        navigate('/customer/products');
      }
    }
  }

  function dataValidator(email, password) {
    const SIX = 6;
    const validateMailRegex = /\S+@\S+\.\S+/;
    if (!validateMailRegex.test(email) || password.length < SIX) return true;
  }

  return (
    <div>
      <div>
        <label htmlFor="email">
          Login:
          <input
            id="email"
            type="text"
            name="email"
            value={ user.email }
            onChange={ (e) => setUser({
              ...user,
              email: e.target.value }) }
            data-testid="common_login__input-email"
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
            data-testid="common_login__input-password"
          />
        </label>
      </div>
      <div>
        <button
          type="button"
          data-testid="common_login__button-login"
          disabled={ dataValidator(user.email, user.password) }
          onClick={ onSubmitButton }
        >
          Login
        </button>
      </div>
      <div>
        <button
          type="button"
          data-testid="common_login__button-register"
        >
          Ainda não tenho conta
        </button>
      </div>
      {
        data.message
        && (
          <alert data-testid="common_login__element-invalid-email">
            {data.message}
          </alert>
        )
      }
    </div>
  );
}

export default LoginPage;
