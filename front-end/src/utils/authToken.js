import decode from 'jwt-decode';

const authToken = () => {
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
  console.log(tokenDecoded);
  if (tokenDecoded.exp <= Math.floor(new Date() / 1000)) {
    localStorage.removeItem('user');
    return false;
  }
  if (tokenDecoded.exp > Math.floor(new Date() / 1000)) {
    return { status: true, role: tokenDecoded.data.role };
  }
};

export default authToken;
