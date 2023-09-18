export const priceAfterDiscount = (price, discount) => {
  return Number.parseFloat(price - (price * discount) / 100).toFixed(2);
};
