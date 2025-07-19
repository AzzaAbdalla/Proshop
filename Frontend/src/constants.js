export const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : process.env.REACT_APP_BASE_URL || "";
// export const BASE_URL = "";
export const PRODUCTS_URL = "http://localhost:5000/api/products";
export const USER_URL = "http://localhost:5000/api/users";
export const ORDERS_URL = "http://localhost:5000/api/orders";
export const PAYPAL_URL = "http://localhost:5000/api/config/paypal";
export const UPLOAD_URL = "http://localhost:5000/api/upload";
