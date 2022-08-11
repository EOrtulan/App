import decode from 'jwt-decode';

const authToken = () => {
  const storage = localStorage.getItem('user');
  const { token } = JSON.parse(storage);
  console.log(token);
  const tokenDecoded = decode(token);
  console.log(tokenDecoded);
  console.log(tokenDecoded.exp <= Math.floor(new Date() / 1000));
  if (tokenDecoded.exp <= Math.floor(new Date() / 1000)) {
    return false;
  }
  if (!tokenDecoded.exp <= Math.floor(new Date() / 1000)) {
    return true;
  }
  // iat
  // if (token) {

  // }
};

export default authToken;
