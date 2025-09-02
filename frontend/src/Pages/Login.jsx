// src/pages/Login.jsx
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AnimatePresence, motion as Motion} from "framer-motion";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice"
import axios from "axios";
import Signup from "./Signup";
import { useNavigate } from "react-router-dom";

export default function Login() {

  const [toggle, setToggle] = useState(true);

  const checkToggle = ()=>{
    setToggle(!toggle);
  }


  const { register, handleSubmit, formState: { errors } } = useForm();

  const dispatch = useDispatch()
  const navigate = useNavigate();


  const onSubmit = async(data) => {
      try {
        const res = await axios.post("http://localhost:3000/api/v1/login", data)
        console.log("✅ Login success:", res.data);
        localStorage.setItem("token", res.data.token);
        dispatch(login({token: res.data.token, user: res.data.user, isAuthenticated:true}))
        navigate("/")
      } catch (error) {
        console.error("❌ Login error:", error.response?.data || error.message);
      } 
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Hero Image */}
      <div className="w-[65%] bg-purple-100 flex items-center justify-center">
        <img
          src="src\assets\hero.png"
          alt="Hero"
          className="object-cover h-full w-full"
        />
      </div>

      {/* Right Login Form */}
      <div className="w-[35%] flex flex-col justify-center px-10 bg-white">
        <div className="fixed top-3 flex gap-2 p-1 bg-gray-300 shadow-2xl w-fit cursor-pointer rounded-lg text-white items-center" onClick={checkToggle} >
          <h3 className={toggle ? "bg-purple-700 p-2 rounded-lg" : "text-black p-2 rounded-lg"}>Login</h3>
          <h3 className={!toggle ? "bg-purple-700 p-2 rounded-lg" : "text-black p-2 rounded-lg"}>Signup</h3>
        </div>
        {toggle ? <h2 className="text-3xl font-bold text-purple-700 mb-6">Welcome Back</h2> : <h2 className="text-3xl font-bold text-purple-700 mb-6">Welcome</h2>}
       
       {/*Making a toggled form  */}
        <AnimatePresence mode="wait" initial={false} > 
          { toggle ? <Motion.div 
            key="login"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.4 }}
          > <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Login Form */}
          {/* Email */}
          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Login
          </button>
        </form>

        {/* Footer Links */}
        <p className="mt-4 text-sm text-gray-500">
          Don't have an account? <a href="#" className="text-purple-600 hover:underline">Sign Up</a>
        </p> </Motion.div> :
        
        // Signup form
        <Motion.div
            key="signup"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.4 }}
        > <Signup /> </Motion.div>}
        </AnimatePresence>
      </div>
    </div>
  );
}
