import { apiSlice } from "./apiSlice";
import { USER_URL } from "../constants";

// for the server
export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `/users/login`,
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `/users`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `/users/logout`,
        method: "POST",
      }),
    }),
    profile: builder.mutation({
      query: (data) => ({
        url: `/users/profile`,
        method: "PUT",
        body: data,
      }),
    }),
    getUsers: builder.query({
      query: () => ({
        url: `/users`,
      }),
      prodvideTags: ["Users"],
      keepUnusedDataFor: 5,
    }),
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `/users/${userId}`,
        method: "DELETE",
      }),
    }),
    getUserDetails: builder.query({
      query: (userId) => ({
        url: `/users/${userId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `/users/${data.userId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useProfileMutation,
  useGetUsersQuery,
  useDeleteUserMutation,
  useGetUserDetailsQuery,
  useUpdateUserMutation,
} = usersApiSlice;
