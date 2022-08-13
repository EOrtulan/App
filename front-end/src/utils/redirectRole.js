const redirectRole = async (navigate, role) => {
  if (role === 'administrator') {
    navigate('/admin/manage');
  }
  if (role === 'seller') {
    navigate('/seller/orders');
  }
  if (role === 'customer') {
    navigate('/customer/products');
  }
};
export default redirectRole;
