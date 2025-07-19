import { apiSlice } from "./apiSlice";
import { ORDERS_URL, PAYPAL_URL } from "../constants";

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: "/orders",
        method: "POST",
        body: { ...order },
      }),
      invalidatesTags: ["Order"],
    }),
    getOrderDetails: builder.query({
      query: (orderId) => ({
        url: `/orders/${orderId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    payOrder: builder.mutation({
      query: ({ orderId, details }) => ({
        url: `/orders/${orderId}/pay`,
        method: "PUT",
        body: { ...details },
      }),
    }),
    getPayPalClientId: builder.query({
      query: () => ({
        url: "/config/paypal",
      }),
      keepUnusedDataFor: 5,
    }),
    getMyOrders: builder.query({
      query: () => ({
        url: `/orders/mine`,
      }),
      keepUnusedDataFor: 5,
    }),
    getOrders: builder.query({
      query: () => ({
        url: "/orders",
      }),
      keepUnusedDataFor: 5,
    }),
    deliverOrder: builder.mutation({
      query: (orderId) => ({
        url: `/orders/${orderId}/deliver`,
        method: "PUT",
      }),
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrderDetailsQuery,
  useGetPayPalClientIdQuery,
  usePayOrderMutation,
  useGetMyOrdersQuery,
  useGetOrdersQuery,
  useDeliverOrderMutation,
} = ordersApiSlice;
