import { useSelector } from "react-redux";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { LineChart } from "../../../components/admin/Charts";
import { getLastMonths } from "../../../utils/Features";
import { UserReducerType } from "../../../types/ReducerTypes";
import { useLineQuery } from "../../../redux/api/DashboardApi";
import toast from "react-hot-toast";
import { CustomError } from "../../../types/Types";
import Loader from "../../../components/admin/Loader";



const Linecharts = () => {

  const { last12Months } = getLastMonths();
  const { user } = useSelector(
    (state: { UserReducer: UserReducerType }) => state.UserReducer
  );
  const { data, isError, error, isLoading } = useLineQuery(user?._id!);
  if (isError) {
    toast.error((error as CustomError).data.message);
    return;
  }

  if (data) {
    console.log(data.charts!);
  }
  const users = data?.charts.users;
  const revenue = data?.charts.revenue;

  
  return (
    <div className="admin-container">
      <AdminSidebar />
      {isLoading ? (
        <Loader />
      ) : (
        <main className="chart-container">
          <h1>Line Charts</h1>
          <section>
            <LineChart
              data={users!}
              label="Users"
              borderColor="rgb(53, 162, 255)"
              labels={last12Months}
              backgroundColor="rgba(53, 162, 255, 0.5)"
            />
            <h2>Active Users</h2>
          </section>

          <section>
            <LineChart
              data={revenue!}
              backgroundColor={"hsla(129,80%,40%,0.4)"}
              borderColor={"hsl(129,80%,40%)"}
              label="Revenue"
              labels={last12Months}
            />
            <h2>Total Revenue </h2>
          </section>
        </main>
      )}
    </div>
  );
};

export default Linecharts;
