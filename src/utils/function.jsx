export const getValueFromKey = (object, key) => {
  return key.split(".").reduce((o, i) => o[i], object);
};

export const formatNumber = (number) => {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    minimumFractionDigits: 8,
  }).format(number);
};
