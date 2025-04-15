import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { VscError } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";
import {
  addToCart,
  calculatePrice,
  discountApplied,
  removeFromCart,
} from "../redux/reducer/CartReducer";
import { server } from "../redux/store";
import { CartReducerInitialState } from "../types/ReducerTypes";
import { CartItemType } from "../types/Types";

const Cart = () => {
  const {
    CartItems,
    discount,
    tax,
    total,
    shippingCharges,
    subtotal,
  } = useSelector(
    (state: { CartReducer: CartReducerInitialState }) => state.CartReducer
  );
  const dispatch = useDispatch();

  const incrementCartHandler = (cartItem: CartItemType) => {
    if (cartItem.quantity >= cartItem.stock) {
      return toast.error("Order Limit Reached");
    }
    dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity + 1 }));
  };
  const decrementCartHandler = (cartItem: CartItemType) => {
    if (cartItem.quantity <= 1) {
      return;
    }
    dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity - 1 }));
  };
  const removeCartHandler = (productId: string) => {
    dispatch(removeFromCart(productId));
  };

  const [couponCode, setCouponcode] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(false);

  useEffect(() => {
    const { token: cancelToken, cancel } = axios.CancelToken.source();
    const timeOutID = setTimeout(() => {
      axios
        .get(`${server}/api/v1/payment/discount?code=${couponCode}`, {
          cancelToken,
        })
        .then((res) => {
          setIsValid(true);
          dispatch(discountApplied(res.data.discount));
           dispatch(calculatePrice());
        })
        .catch(() => {
          setIsValid(false);
          dispatch(discountApplied(0));
           dispatch(calculatePrice());
        });
    }, 1000);
    return () => {
      clearTimeout(timeOutID);
      cancel();
      setIsValid(false);
    };
  }, [couponCode]);

  useEffect(() => {
    dispatch(calculatePrice());
  }, [CartItems]);

  useEffect(() => {
   localStorage.setItem("myCart",JSON.stringify(CartItems))
  }, [CartItems])
  
  return (
    <div className="cart">
      <main>
        {CartItems?.length > 0 ? (
          CartItems.map((i, idx) => (
            <CartItem
              incrementCartHandler={incrementCartHandler}
              removeCartHandler={removeCartHandler}
              decrementCartHandler={decrementCartHandler}
              key={idx}
              cartItem={i}
            />
          ))
        ) : (
          <h1>No Items Added</h1>
        )}
      </main>
      <aside>
        <p>SubTotal:₹{subtotal}</p>
        <p>Shipping Charges:₹{shippingCharges}</p>
        <p>Tax:₹{tax}</p>
        <p>
          Discount: <em className="red">- ₹{discount}</em>
        </p>
        <p>
          <b>Total:₹{total}</b>
        </p>

        <input
          type="text"
          placeholder="Coupon Code"
          value={couponCode}
          onChange={(e) => setCouponcode(e.target.value)}
        />
        {couponCode &&
          (isValid ? (
            <span className="green">
              ₹{discount} off using the <b>{couponCode}</b>
            </span>
          ) : (
            <span className="red">
              Invalid Coupon
              <VscError />
            </span>
          ))}

        {CartItems.length > 0 && <Link to="/shipping">Checkout</Link>}
      </aside>
    </div>
  );
};

export default Cart;
