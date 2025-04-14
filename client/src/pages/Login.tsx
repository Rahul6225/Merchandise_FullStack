import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { auth } from "../firebase";
import { useLoginMutation } from "../redux/api/UserApi";
const Login = () => {
  const [gender, setGender] = useState("");
  const [date, setDate] = useState("");

  const [login] = useLoginMutation();

  const loginHandler = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);
      // if (!date || !gender) {
      //   toast.error("All Fields not filled");
      //   return;
      // }
      const res = await login({
        name: user.displayName!,
        _id: user.uid!,
        email: user.email!,
        photo: user.photoURL!,
        role: "user",
        gender: gender,
        dob: date,
      });

      if ("data" in res) {
        toast.success(res.data.message);
      } else {
        const error=res.error as FetchBaseQueryError;
        console.log(error.data);
        // const error = res.error as FetchBaseQueryError;
        // const message = (error.data as MessageResponse).message;
        toast.error("sign in Fail");
      }
      console.log(user);
    } catch (error) {
      toast.error("Sign in fail");
    }
  };
  return (
    <div className="login">
      <main>
        <h1>LOGIN</h1>

        <div>
          <label>Gender</label>
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div>
          <label>Date of Birth</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="google-but">
          <p>Already Signed In Once </p>
          <button onClick={loginHandler}>
            <FcGoogle />
            <p>Sign in With Google</p>
          </button>
        </div>
      </main>
    </div>
  );
};

export default Login;
