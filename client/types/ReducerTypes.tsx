import { CartItemType, ShippingInfoType, UserType } from "./Types";

export type UserReducerType = {
  user: UserType | null;
  loading: boolean;
};

export type CartReducerInitialState = {
  loading: boolean;
  CartItems: CartItemType[];
  subtotal: number;
  tax: number;
  discount:number;
  shippingCharges: number;
  total: number;
  shippingInfo: ShippingInfoType;
};
