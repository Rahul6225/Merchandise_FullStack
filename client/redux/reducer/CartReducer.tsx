import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CartReducerInitialState } from "../../types/ReducerTypes";
import { CartItemType, ShippingInfoType } from "../../types/Types";


const getCartData=()=>{
  var localCartData = localStorage.getItem("myCart");
  if(!localCartData){
    return [];
  }
  else{
    return JSON.parse(localCartData);
  }
};
const initialState: CartReducerInitialState = {
  loading: false,
  CartItems: getCartData(),
  subtotal: 0,
  shippingCharges: 0,
  discount: 0,
  tax: 0,
  total: 0,
  shippingInfo: {
    address: "",
    city: "",
    state: "",
    country: "",
    pinCode: "",
  },
};

export const CartReducer = createSlice({
  name: "CartReducer",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItemType>) => {
      state.loading = true;
      const index = state.CartItems.findIndex(
        (i) => i.productId === action.payload.productId
      );

      if (index !== -1) {
        state.CartItems[index] = action.payload;
      } else {
        state.CartItems.push(action.payload);
      }

      state.loading = false;
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.loading = true;
      state.CartItems = state.CartItems.filter(
        (i) => i.productId !== action.payload
      );
      state.loading = false;
    },
    calculatePrice: (state) => {
      const subtotal = state.CartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );

      state.subtotal = subtotal;
      state.shippingCharges = state.subtotal > 200 ? 0 : 100;
      state.tax = Math.round(state.subtotal * 0.18);
      state.total =
        state.subtotal + state.tax + state.shippingCharges - state.discount;
    },
    discountApplied: (state, action: PayloadAction<number>) => {
      state.discount = action.payload;
    },
    saveShippingInfo: (state, action: PayloadAction<ShippingInfoType>) => {
      state.shippingInfo = action.payload;
    },
    resetCart: () => initialState,
    
  },
  
});
// useEffect(() => {}, [state.CartItems]);



export const { addToCart, removeFromCart, calculatePrice, discountApplied ,saveShippingInfo,resetCart} =
  CartReducer.actions;
