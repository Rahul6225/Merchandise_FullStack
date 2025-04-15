import { FaTrash } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import AdminSidebar from "../../../components/admin/AdminSidebar";
// import { OrderItem } from "../../../models/types";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import Loader from "../../../components/admin/Loader";
import {
  useDeleteOrderMutation,
  useOrdersDetailsQuery,
  useProcessOrderMutation,
} from "../../../redux/api/OrderApi";
import { server } from "../../../redux/store";
import { UserReducerType } from "../../../types/ReducerTypes";
import { OrderItemType, OrderType } from "../../../types/Types";

const DefaultData: OrderType = {
  shippingInfo: {
    address: "77 black street",
    city: "Neyword",
    state: "Nevada",
    country: "US",
    pinCode: "",
  },
  status: "",
  subtotal: 0,
  discount: 0,
  shippingCharges: 0,
  tax: 0,
  total: 0,
  orderItems: [],
  user: { name: "", _id: "" },
  _id: "",
};

const TransactionManagement = () => {
  const { user } = useSelector(
    (state: { UserReducer: UserReducerType }) => state.UserReducer
  );
  const params = useParams();
  const navigate = useNavigate();

  const { data, isError, isLoading } = useOrdersDetailsQuery(params.id!);

  const {
    shippingInfo: { address, city, country, pinCode, state },
    orderItems,
    user: { name },
    status,
    shippingCharges,
    subtotal,
    tax,
    total,
    discount,
  } = data?.order || DefaultData;

  if (isError) {
    navigate("/404");
  }
  // const [order, setOrder] = useState({});

  const [updateOrder] = useProcessOrderMutation();
const [deleteOrder]=useDeleteOrderMutation();
  const updateHandler = async () => {
    const res = await updateOrder({
      userId: user?._id!,
      orderId: data?.order._id!,
    });
    if ("data" in res) {
      const val = res.data.status;
      toast.success(`Order Status is Set to ${val}`);
    }
    if ("error" in res) {
      toast.error("Some Error!");
    }
    navigate("/admin/transaction");
  };
  const deleteHandler = async() => {
     const res = await deleteOrder({
       userId: user?._id!,
       orderId: data?.order._id!,
     });
     if ("data" in res) {
       
       toast.success("Order Deleted");
     }
     if ("error" in res) {
       toast.error("Some Error!");
     }
     navigate("/admin/transaction");
  };
  return (
    <div className="admin-container">
      <AdminSidebar />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {" "}
          <main className="product-management">
            <section
              style={{
                padding: "2rem",
              }}
            >
              <h2>Order Items</h2>

              {orderItems.map((i) => (
                <ProductCard
                  key={i._id}
                  name={i.name}
                  photo={`${server}/${i.photo}`}
                  productId={i.productId}
                  _id={i._id}
                  quantity={i.quantity}
                  price={i.price}
                />
              ))}
            </section>

            <article className="shipping-info-card">
              <button className="product-delete-btn" onClick={deleteHandler}>
                <FaTrash />
              </button>
              <h1>Order Info</h1>
              <h5>User Info</h5>
              <p>Name: {name}</p>
              <p>
                Address:{" "}
                {`${address}, ${city}, ${state}, ${country} ${pinCode}`}
              </p>
              <h5>Amount Info</h5>
              <p>Subtotal: {subtotal}</p>
              <p>Shipping Charges: {shippingCharges}</p>
              <p>Tax: {tax}</p>
              <p>Discount: {discount}</p>
              <p>Total: {total}</p>

              <h5>Status Info</h5>
              <p>
                Status:{" "}
                <span
                  className={
                    status === "Delivered"
                      ? "purple"
                      : status === "Shipped"
                      ? "green"
                      : "red"
                  }
                >
                  {status}
                </span>
              </p>
              <button className="shipping-btn" onClick={updateHandler}>
                Process Status
              </button>
            </article>
          </main>
        </>
      )}
    </div>
  );
};

const ProductCard = ({
  name,
  photo,
  price,
  quantity,
  productId,
}: OrderItemType) => (
  <div className="transaction-product-card">
    <img src={photo} alt={name} />
    <Link to={`/product/${productId}`}>{name}</Link>
    <span>
      ₹{price} X {quantity} = ₹{price * quantity}
    </span>
  </div>
);

export default TransactionManagement;
