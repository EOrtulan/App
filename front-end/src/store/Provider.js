import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import MyContext from './index';

function MyProvider({ children }) {
  const [produtos, setProdutos] = useState([]);

  const contextValue = useMemo(() => ({
    produtos, setProdutos,
  }), [produtos]);

  return <MyContext.Provider value={ contextValue }>{children}</MyContext.Provider>;
}

MyProvider.propTypes = {
  children: PropTypes.node,
}.isRequire;

export default MyProvider;
