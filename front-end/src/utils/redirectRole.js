const redirectRole = async (token, navigate) => {
  if (token) {
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
};
export default redirectRole;
