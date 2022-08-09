function dataValidator(email, password, name) {
  const SIX = 6;
  const TWELVE = 12;
  const validateMailRegex = /\S+@\S+\.\S+/;
  if (name && name.length < TWELVE) return true;
  if (!validateMailRegex.test(email) || password.length < SIX) return true;
}

export default dataValidator;
