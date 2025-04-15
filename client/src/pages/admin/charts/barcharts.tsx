import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { BarChart } from "../../../components/admin/Charts";
import Loader from "../../../components/admin/Loader";
import { useBarQuery } from "../../../redux/api/DashboardApi";
import { UserReducerType } from "../../../types/ReducerTypes";
import { CustomError } from "../../../types/Types";
import { getLastMonths } from "../../../utils/Features";


const Barcharts = () => {

  const {last12Months,last6Months}=getLastMonths();
  const { user } = useSelector(
    (state: { UserReducer: UserReducerType }) => state.UserReducer
  );
  const { data, isError, error, isLoading } = useBarQuery(user?._id!);
  if (isError) {
    toast.error((error as CustomError).data.message);
    return;
  }

  if (data) {
    console.log(data.charts!);
  }
  const orders = data?.charts.orders;
  const product = data?.charts.product;

  const users = data?.charts.users;

  return (
    <div className="admin-container">
      <AdminSidebar />
      {isLoading ? (
        <Loader />
      ) : (
        <main className="chart-container">
          <h1>Bar Charts</h1>
          <section>
            <BarChart
              data_1={product!}
              data_2={users!}
              title_1="Products"
              title_2="Users"
              bgColor_1={`hsl(260, 50%, 30%)`}
              bgColor_2={`hsl(360, 90%, 90%)`}
              labels={last6Months}
            />
            <h2>Top Products & Top Customers</h2>
          </section>

          <section>
            <BarChart
              horizontal={true}
              data_1={orders!}
              data_2={[]}
              title_1="Orders"
              title_2=""
              bgColor_1={`hsl(180, 40%, 50%)`}
              bgColor_2=""
              labels={last12Months}
            />
            <h2>Orders throughout the year</h2>
          </section>
        </main>
      )}
    </div>
  );
};

export default Barcharts;
