import React from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';
function Signup() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { handleSubmit, register, formState: { errors } } = useForm();

    const onSubmit = async (data)=>{
        try {
        const res = await axios.post("http://localhost:3000/api/v1/signup", data)
        console.log("✅ Signup success:", res.data);
        localStorage.setItem("token", res.data.token);
        dispatch(login({token: res.data.token, user: res.data.user, isAuthenticated:true}))
        navigate("/home")
      } catch (error) {
        console.error("❌ Signup error:", error.response?.data || error.message);
      }
    }


  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-gray-700 mb-1">Username</label>
            <input
              type="name"
              {...register("name", { required: "Name is required" })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>
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
            Signup
          </button>
        </form>

        {/* Footer Links */}
        <p className="mt-4 text-sm text-gray-500">
          Already have an account? <a href="#" className="text-purple-600 hover:underline">Login</a>
        </p>
    </div>
  )
}

export default Signup
