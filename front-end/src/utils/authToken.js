import decode from 'jwt-decode';

const authToken = () => {
  const THOUSAND = 1000;
  const user = localStorage.getItem('user');
  if (!user) {
    return false;
  }
  const { token } = JSON.parse(user);
  if (!token) {
    localStorage.removeItem('user');
    return false;
  }
  const tokenDecoded = decode(token);
  if (tokenDecoded.exp <= Math.floor(new Date() / THOUSAND
  || tokenDecoded === undefined || tokenDecoded === null)) {
    localStorage.removeItem('user');
    return false;
  }
  if (tokenDecoded.exp > Math.floor(new Date() / THOUSAND)) {
    return { status: true, role: tokenDecoded.data.role };
  }
};

export default authToken;
