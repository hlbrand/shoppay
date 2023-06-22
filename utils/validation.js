export const validateEmail = (email) => {
  const regextSt = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regextSt.test(email);
};
