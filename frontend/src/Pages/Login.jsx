import { useForm } from "react-hook-form";
import RevealText from "../components/cool/RevealText";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const onSubmit = async(data) => {
    try {
      const res = await axios.post("http://localhost:3000/api/v1/login", data);
      console.log(res.data.message);
      localStorage.setItem("token", res.data.token);
      dispatch(login({token: res.data.token, user: res.data.user, isAuthenticated: true}));
      navigate("/");
    } catch (error) { 
      console.log("Error: ", error);
    } // only UI now
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Hero Image */}
      <div className="w-[65%] bg-purple-100 flex items-center justify-center">
        <img
          src="src\assets\lgn-hero.png"
          alt="Hero"
          className="object-cover h-full w-full"
        />
      </div>

      {/* Right Login Form */}
      <div className="w-[35%] flex flex-col justify-center px-10 bg-white">
        <h2 className="text-3xl font-bold text-purple-700 mb-6"><RevealText lines={["Welcome Back!", "SILICON..."]} /></h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
        </p>
      </div>
    </div>
  );
}