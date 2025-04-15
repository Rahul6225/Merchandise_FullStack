import { ReactElement, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Column } from "react-table";
import TableHOC from "../components/admin/TableHOC";
import { useMyOrdersQuery } from "../redux/api/OrderApi";
import { UserReducerType } from "../types/ReducerTypes";
import { CustomError } from "../types/Types";

type Datatype = {
  _id: string;
  amount: number;
  quantity: number;
  status: ReactElement;
  action: ReactElement;
};
const column: Column<Datatype>[] = [
  {
    Header: "ID",
    accessor: "_id",
  },
  {
    Header: "Amount",
    accessor: "amount",
  },
  {
    Header: "Quantity",
    accessor: "quantity",
  },
  {
    Header: "Status",
    accessor: "status",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];
const Orders = () => {
  const { user } = useSelector(
    (state: { UserReducer: UserReducerType }) => state.UserReducer
  );
  // const [rows] = useState<Datatype[]>([
  //   {
  //     _id: "dwwedfw",
  //     amount: 2142,
  //     quantity: 4,
  //     status: <span className="red">Processing</span>,
  //     action: <Link to={"/order/dwwedfw"}>View</Link>,
  //   },
  // ]);
  const { data, isError, error } = useMyOrdersQuery(user?._id!);

  const [rows, setRows] = useState<Datatype[]>([]);
  if (isError) {
    toast.error((error as CustomError).data.message);
  }
  useEffect(() => {
    if (data) {
      console.log(data);
      setRows(
        data.orders.map((i) => ({
          _id: i._id,
          amount: i.total,
          quantity: 2,
          status: (
            <span
              className={
                i.status === "Processing"
                  ? "red"
                  : i.status === "Shipped"
                  ? "green"
                  : "purple"
              }
            >
              {i.status}
            </span>
          ),
          action: <Link to={`/order/${i._id}`}>View</Link>,
        }))
      );
    }
  }, [data]);
  const Table = TableHOC<Datatype>(
    column,
    rows,
    "dashboard-product-box",
    "Orders",
    rows.length > 6
  )();
  return (
    <div className="orders">
      <h1>MY ORDERS</h1>
      {Table}
    </div>
  );
};

export default Orders;
