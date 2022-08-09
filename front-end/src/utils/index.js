function dataValidator(email, password) {
  const SIX = 6;
  const validateMailRegex = /\S+@\S+\.\S+/;
  if (!validateMailRegex.test(email) || password.length < SIX) return true;
}

export default dataValidator;
