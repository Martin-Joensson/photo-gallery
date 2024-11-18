export const CapitalizeFirstLetter = (val) => {
  if (val != null || undefined) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
  } else {
    return null;
  }
};
