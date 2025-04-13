import { signOut } from "firebase/auth";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaSearch, FaSignInAlt, FaSignOutAlt, FaUserAlt } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { UserType } from "../types/Types";



type HeaderProptype={
  user:UserType |null;

}
const Header = ({user}:HeaderProptype) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const logoutHandler = async() => {
    try {
      await signOut(auth);
      toast.success("Signed Out");
      
    } catch (error) {
      toast.error("Sign Out Fail");
    }
    setIsOpen(false);
  };
  return (
    <nav className="header">
      <Link onClick={() => setIsOpen(false)} to={"/"}>
        Home
      </Link>
      <Link onClick={() => setIsOpen(false)} to={"/search"}>
        <FaSearch />
      </Link>
      <Link onClick={() => setIsOpen(false)} to={"/cart"}>
        <FaCartShopping />
      </Link>

      {user?._id ? (
        <>
          <button onClick={() => setIsOpen((prev) => !prev)}>
            <FaUserAlt />
          </button>
          <dialog open={isOpen}>
            <div>
              {user.role === "admin" ? (
                <Link onClick={() => setIsOpen(false)} to={"/admin/dashboard"}>
                  Admin
                </Link>
              ) : (
                <></>
              )}
              <Link onClick={() => setIsOpen(false)} to={"/orders"}>
                Orders
              </Link>
              <button onClick={logoutHandler}>
                <FaSignOutAlt />
              </button>
            </div>
          </dialog>
        </>
      ) : (
        <Link to={"/login"}>
          <FaSignInAlt />
        </Link>
      )}
    </nav>
  );
};

export default Header;








