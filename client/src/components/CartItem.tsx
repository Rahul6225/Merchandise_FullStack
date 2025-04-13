import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CartItemType } from "../types/Types";

type CartItemProps = {
  cartItem: CartItemType;
  incrementCartHandler: (cartItem: CartItemType) => void;
  decrementCartHandler: (cartItem: CartItemType) => void;
  removeCartHandler: (id: string) => void;
};

const CartItem = ({ cartItem, incrementCartHandler,decrementCartHandler,removeCartHandler }: CartItemProps) => {
  const { productId, photo, name, price, quantity } = cartItem;
  return (
    <div className="cart-item">
      <img src={photo} alt={photo} />
      <article>
        <Link to={`/product/${productId}`}>{name}</Link>
        <p>₹{price}</p>
      </article>
      <div className="add-minus">
        <button onClick={() => decrementCartHandler(cartItem)}>-</button>
        <p>{quantity}</p>
        <button onClick={() => incrementCartHandler(cartItem)}>+</button>
      </div>
      <button onClick={() => removeCartHandler(productId)}>
        <FaTrash />
      </button>
    </div>
  );
};

export default CartItem;
