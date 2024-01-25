export const BASE_URL =
  process.env.NOE_ENV === "development" ? "http://localhost:5000" : "";
// export const BASE_URL = "";
export const PRODUCTS_URL = "http://localhost:5000/api/products";
export const USER_URL = "http://localhost:5000/api/users";
export const ORDERS_URL = "http://localhost:5000/api/orders";
export const PAYPAL_URL = "http://localhost:5000/api/config/paypal";
