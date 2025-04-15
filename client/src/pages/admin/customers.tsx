import { ReactElement, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Column } from "react-table";
import AdminSidebar from "../../components/admin/AdminSidebar";
import Loader from "../../components/admin/Loader";
import TableHOC from "../../components/admin/TableHOC";
import { useDeleteUserMutation, useGetAllUserQuery } from "../../redux/api/UserApi";
import { UserReducerType } from "../../types/ReducerTypes";
import { CustomError } from "../../types/Types";

interface DataType {
  avatar: ReactElement;
  name: string;
  email: string;
  gender: string;
  role: string;
  action: ReactElement;
}

const columns: Column<DataType>[] = [
  {
    Header: "Avatar",
    accessor: "avatar",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Gender",
    accessor: "gender",
  },
  {
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "Role",
    accessor: "role",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

// const img = "https://randomuser.me/api/portraits/women/54.jpg";
// const img2 = "https://randomuser.me/api/portraits/women/50.jpg";



const Customers = () => {




  const { user } = useSelector(
    (state: { UserReducer: UserReducerType }) => state.UserReducer
  );

  const { data, isError, error,isLoading } = useGetAllUserQuery(user?._id!);
const [deleteUser]=useDeleteUserMutation();
  if (isError) {
    toast.error((error as CustomError).data.message);
  }
  const [rows, setRows] = useState<DataType[]>([]);

  const Table = TableHOC<DataType>(
    columns,
    rows,
    "dashboard-product-box",
    "Customers",
    rows.length > 6
  )();

  const DeleteHandler=async(id:string)=>{
 const res = await deleteUser({
  userId:id,
  adminId:user?._id!,
 });
    
 if("error" in res){
  toast.error("Couldn't Delete The User")
  return;
 }

 if("data" in res){
  if(data?.success ===true){
    toast.success("user Deleted")
    return;
  }
  else{
    toast.error("Something Went wrong");
    return ;
  }
 }
  }
 useEffect(() => {
   if (data) {
     console.log(data);
     setRows(
       data.users.map((i) => ({
         avatar: (
           <img
             style={{
               borderRadius: "50%",
             }}
             src={i.photo }
             alt="user"
           />
         ),
         name: i.name,
         email: i.email,
         gender: i.gender,
         role: i.role,
         action: (
           <button onClick={()=>DeleteHandler(i._id)}>
             <FaTrash />
           </button>
         ),
       }))
     );
   }
 }, [data]);
  return (
    <div className="admin-container">
      <AdminSidebar />
      {isLoading ? <Loader /> : <main>{Table}</main>}
    </div>
  );
};

export default Customers;
