export const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000/api"
    : process.env.REACT_APP_BASE_URL || "";

export const PRODUCTS_URL = `${BASE_URL}/products`;
export const USER_URL = `${BASE_URL}/users`;
export const ORDERS_URL = `${BASE_URL}/orders`;
export const PAYPAL_URL = `${BASE_URL}/config/paypal`;
export const UPLOAD_URL = `${BASE_URL}/upload`;
