import { FaPlus } from "react-icons/fa";
import { CartItemType } from "../types/Types";

type ProductsProps = {
  productId: string;
  name: string;
  photo: string;
  price: number;
  stock: number;
  handler: (cartItem: CartItemType) => string | undefined;
};

const ProductCard = ({
  productId,
  name,
  photo,
  price,
  stock,
  handler,
}: ProductsProps) => {
  return (
    <div className="product-card">
      <img src={photo} alt={name} />
      <h3>{name}</h3>
      <p>₹{price}</p>
      <div>
        <button
          onClick={() => handler({ productId, name, photo, price, stock,quantity:1 })}
        >
          <FaPlus />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
