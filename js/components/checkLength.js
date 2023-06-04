export const checkLength = (value, length) => {
  if (value.trim().length > length) {
    return true;
  } else {
    return false;
  }
};
