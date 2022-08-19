import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../service/api';
import dataValidator, { redirectRole } from '../utils';

function Register() {
  const navigate = useNavigate();
  const [errorRegister, setErrorRegister] = useState(false);
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    const userStorage = localStorage.getItem('user');
    if (userStorage) {
      localStorage.removeItem('user');
    }
  }, []);

  const buttonRegister = async () => {
    try {
      const data = await register(user.name, user.email, user.password);
      localStorage.setItem('user', JSON.stringify(data));
      redirectRole(navigate, data.role);
    } catch (err) {
      setErrorRegister(true);
    }
  };

  return (
    <div
      className="h-screen w-screen items-center
     justify-center flex primarioBackground"
    >
      <div
        className="flex flex-col justify-between h-full max-h-80
      shadow-2xl p-8 backGroundGreyLogin rounded-md"
      >
        <div>
          <label htmlFor="name">
            Nome
            <input
              id="name"
              className="border-solid border-1
               border-black w-full leading-10 rounded pl-4"
              placeholder="Eu sou Batman"
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
              className="border-solid border-1
              border-black w-full leading-10 rounded pl-4"
              placeholder="hulkesmaga@gmail.com"
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
              className="border-solid border-1
              border-black w-full leading-10 rounded pl-4"
              placeholder="*********"
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
            className="border-solid border-1 border-black
             cursor-pointer w-full leading-8 rounded-md text-white primarioBackground"
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
    </div>
  );
}

export default Register;
