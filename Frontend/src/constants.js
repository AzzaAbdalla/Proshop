export const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000/api"
    : process.env.REACT_APP_BASE_URL || "";

export const PRODUCTS_URL = `${BASE_URL}/api/products`;
export const USER_URL = `${BASE_URL}/api/users`;
export const ORDERS_URL = `${BASE_URL}/api/orders`;
export const PAYPAL_URL = `${BASE_URL}/api/config/paypal`;
export const UPLOAD_URL = `${BASE_URL}/api/upload`;
