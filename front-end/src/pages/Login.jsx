import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import login from '../service/api';
import dataValidator, { redirectRole } from '../utils';
import logo from '../asserts/logo.png';

function LoginPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const [notFoundEmail, setNotFoundEmail] = useState(false);

  async function onSubmitButton() {
    try {
      const response = await login(user.email, user.password);
      localStorage.setItem('user', JSON.stringify(response));
      redirectRole(navigate, response.role);
    } catch (err) {
      setNotFoundEmail(true);
    }
  }

  const verifyLogged = () => {
    const localUser = JSON.parse(localStorage.getItem('user'));
    if (localUser) {
      redirectRole(navigate, localUser.role);
    }
  };

  useEffect(() => {
    verifyLogged();
  }, []);

  return (
    <div
      className="h-screen w-screen items-center
     justify-center flex flex-col primarioBackground"
    >
      <div className="w-64 h-64">
        <img src={ logo } alt="logo" />
      </div>
      <div
        className="flex flex-col justify-between h-full max-h-72
         shadow-2xl p-8 backGroundGreyLogin rounded-md"
      >
        <div>
          <div>
            Login
          </div>
          <div className="w-60">
            <input
              className="border-solid border-1
               border-black w-full leading-10 rounded pl-4"
              id="email"
              type="text"
              name="email"
              placeholder="hulkesmaga@gmail.com"
              value={ user.email }
              onChange={ (e) => setUser({
                ...user,
                email: e.target.value }) }
              data-testid="common_login__input-email"
            />
          </div>
        </div>
        <div>
          <div>
            Senha
          </div>
          <div className="w-60">
            <input
              className="border-solid border-1
               border-black w-full leading-10 rounded pl-4"
              id="password"
              type="password"
              placeholder="************"
              name="password"
              value={ user.password }
              onChange={ (e) => setUser({
                ...user,
                password: e.target.value }) }
              data-testid="common_login__input-password"
            />
          </div>
        </div>
        <div className="flex justify-center w-60">
          <button
            className="border-solid border-1 border-black
             cursor-pointer w-full leading-8 rounded-md text-white primarioBackground"
            type="button"
            data-testid="common_login__button-login"
            disabled={ dataValidator(user.email, user.password) }
            onClick={ onSubmitButton }
          >
            Login
          </button>
        </div>
        <div className="flex justify-center w-60">
          <button
            className="border-solid border-1 border-black cursor-pointer
             w-full leading-8 rounded-md backGroundGrey primarioBorderCollor"
            type="button"
            data-testid="common_login__button-register"
            onClick={ () => navigate('/register') }
          >
            Ainda não tenho conta
          </button>
        </div>
        {
          notFoundEmail
          && (
            <alert data-testid="common_login__element-invalid-email">
              Email not found
            </alert>
          )
        }
      </div>
    </div>
  );
}

export default LoginPage;
