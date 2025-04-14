import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./api/UserApi";
import { UserReducer } from "./reducer/UserReducer";
import { ProductApi } from "./api/ProductApi";
import { CartReducer } from "./reducer/CartReducer";
import { OrderApi } from "./api/OrderApi";
import { DashboardApi } from "./api/DashboardApi";

export const server = import.meta.env.VITE_SERVER;
export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [UserReducer.name]: UserReducer.reducer,
    [ProductApi.reducerPath]: ProductApi.reducer,
    [DashboardApi.reducerPath]: DashboardApi.reducer,
    [CartReducer.name]: CartReducer.reducer,
    [OrderApi.reducerPath]: OrderApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userApi.middleware)
      .concat(ProductApi.middleware)
      .concat(OrderApi.middleware)
      .concat(DashboardApi.middleware)
});
