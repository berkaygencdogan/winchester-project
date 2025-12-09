export const Validator = {
  isEmpty(value) {
    return !value || value.trim() === "";
  },

  minLength(value, length) {
    return value && value.trim().length >= length;
  },

  isYearValid(year) {
    const n = Number(year);
    return n > 1940 && n <= new Date().getFullYear();
  },
};
