import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useNewOrderMutation } from "../redux/api/OrderApi";
import { resetCart } from "../redux/reducer/CartReducer";
import {
  CartReducerInitialState,
  UserReducerType,
} from "../types/ReducerTypes";
import { NewOrderReqType } from "../types/Types";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

const CheckoutForm = () => {
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [newOrder] = useNewOrderMutation();

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector(
    (state: { UserReducer: UserReducerType }) => state.UserReducer
  );

  const {
    shippingInfo,
    CartItems,
    subtotal,
    tax,
    discount,
    total,
    shippingCharges,
  } = useSelector(
    (state: { CartReducer: CartReducerInitialState }) => state.CartReducer
  );
  const SubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!stripe || !elements) {
      navigate("/cart");

      return;
    }
    const orderData: NewOrderReqType = {
      shippingInfo,
      shippingCharges,
      orderItems: CartItems,
      subtotal,
      tax,
      discount,
      total,
      user: user?._id!,
    };
    setIsProcessing(true);
    const { paymentIntent, error } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: window.location.origin },
      redirect: "if_required",
    });
    if (error) {
      setIsProcessing(false);
      console.log(error);
      return toast.error("Something went wrong");
    }

    if (paymentIntent?.status === "succeeded") {
      await newOrder(orderData);

      localStorage.removeItem("myCart");
      dispatch(resetCart());
      console.log("palcing order");
      toast.success("Order Placed");
      navigate("/orders");
    }
    setIsProcessing(false);
  };

  return (
    <div className="checkout-container">
      <form onSubmit={SubmitHandler}>
        <PaymentElement />
        <button type="submit" disabled={isProcessing}>
          {isProcessing ? "Processing..." : "PAY"}
        </button>
      </form>
    </div>
  );
};

const Checkout = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const clientSecret: string | undefined = location.state;
  if (!clientSecret) {
    navigate("/cart");
    return;
  }
  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret,
      }}
    >
      <CheckoutForm />
    </Elements>
  );
};

export default Checkout;
