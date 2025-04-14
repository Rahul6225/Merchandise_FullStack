import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  AllOrdersResponse,
  MessageResponse,
  NewOrderReqType,
  ProcessOrderReqType,
  ProcessOrderResType,
  SingleOrdersResponse,
} from "../../types/Types";

export const OrderApi = createApi({
  reducerPath: "OrderApi",

  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/order/`,
  }),
  tagTypes: ["orders"],
  endpoints: (builder) => ({
    NewOrder: builder.mutation<MessageResponse, NewOrderReqType>({
      query: (order) => ({
        url: "new",
        method: "POST",
        body: order,
      }),
      invalidatesTags: ["orders"],
    }),
    ProcessOrder: builder.mutation<ProcessOrderResType, ProcessOrderReqType>({
      query: ({ orderId, userId }) => ({
        url: `${orderId}?id=${userId}`,
        method: "PUT",
      }),
      invalidatesTags: ["orders"],
    }),
    DeleteOrder: builder.mutation<MessageResponse, ProcessOrderReqType>({
      query: ({ orderId, userId }) => ({
        url: `${orderId}?id=${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["orders"],
    }),
    myOrders: builder.query<AllOrdersResponse, string>({
      query: (id) => `my?id=${id}`,
      providesTags: ["orders"],
    }),
    allOrders: builder.query<AllOrdersResponse, string>({
      query: (id) => `all?id=${id}`,
      providesTags: ["orders"],
    }),
    ordersDetails: builder.query<SingleOrdersResponse, string>({
      query: (id) => `${id}`,
      providesTags: ["orders"],
    }),
  }),
});

export const {
  useNewOrderMutation,
  useAllOrdersQuery,
  useDeleteOrderMutation,
  useMyOrdersQuery,
  useOrdersDetailsQuery,
  useProcessOrderMutation,
} = OrderApi;
