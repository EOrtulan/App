import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import MyContext from './index';
// import authToken from '../utils/authToken';

function MyProvider({ children }) {
  const [produtos, setProdutos] = useState([]);

  // useEffect(() => {
  //   authToken();
  // }, []);

  // const store = useMemo(() => ({ produtos, setProdutos }), []);
  // const memoizedErrors = useMemo(() => <Errors active={showErrors} />, [showErrors]);

  const contextValue = useMemo(() => ({
    produtos, setProdutos,
  }), [produtos]);
  // const store = {
  //   produtos,
  //   setProdutos,
  // };

  return <MyContext.Provider value={ contextValue }>{children}</MyContext.Provider>;
}

MyProvider.propTypes = {
  children: PropTypes.node,
}.isRequire;

export default MyProvider;
