import {React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { AnimatePresence} from "framer-motion"
import { Sun, Moon } from "lucide-react";
import { motion as Motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authSlice";


function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [isScrolled,setIsScrolled] = useState(false);
  const {isAuthenticated } = useSelector((state)=> state.auth);
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => setDarkMode(!darkMode);
  const loGout = ()=>{
    dispatch(logout());
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    navigate("/auth")
  } 

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) setIsScrolled(true);
      else setIsScrolled(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);



  return (
    <header className={`
        fixed top-0 left-1/2 transform -translate-x-1/2
        flex items-center justify-between transition-all duration-300 ease-in-out
        ${isScrolled 
          ? "w-[60%] py-3 px-6 rounded-2xl bg-[#fffbe7] shadow-xl" 
          : "w-[80%] p-6 bg-[#fffbe7] rounded-3xl mt-10"
        }
        text-black z-50
      `}>
      <div className="flex gap-5 items-center ">
        <img src="src\assets\logo2.png" alt="" className="size-15 rounded-xl m-0 p-0"/>
      <Link
        to="/Home"
        className="text-xl new-font hover:bg-[#0A3D91] hover:text-white cursor-pointer transition-all duration-200 ease-out rounded-xl p-3 hover:translate-x-[4px] hover:translate-y-[-4px] hover:shadow-[8px_8px_0px_0px_#000]"
      >
        Silicon
      </Link>
      </div>
      {/* <h2 className="text-xl new-font hover:text-purple-600 cursor-pointer">CTRL</h2> */}
      <div className="flex items-center justify-evenly gap-4">
        <ul className="flex gap-3 new-font2">
          <Link to="/Home" className="hover:bg-[#0A3D91] hover:text-white transition-all duration-200 ease-out rounded-xl p-3 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[8px_8px_0px_0px_#000]">
            Home
          </Link>
          <Link to="/school" className="hover:bg-[#0A3D91] hover:text-white transition-all duration-200 ease-out rounded-xl p-3 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[8px_8px_0px_0px_#000]">
            School
          </Link>
          <Link to="/dashboard" className="hover:bg-[#0A3D91] hover:text-white transition-all duration-200 ease-out rounded-xl p-3 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[8px_8px_0px_0px_#000]">
            Dashboard
          </Link>
          <Link to="/finance" className="hover:bg-[#0A3D91] hover:text-white transition-all duration-200 ease-out rounded-xl p-3 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[8px_8px_0px_0px_#000]">
            Finance
          </Link>
        </ul>
        <button
      onClick={toggleTheme}
      className="relative flex items-center justify-center w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-800"
    >
      <AnimatePresence mode="wait" initial={false}>
        {darkMode ? (
          <Motion.div
            key="moon"
            initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
            transition={{ duration: 0.3 }}
          >
            <Moon className="w-6 h-6 text-yellow-400" />
          </Motion.div>
        ) : (
          <Motion.div
            key="sun"
            initial={{ opacity: 0, rotate: 90, scale: 0.5 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: -90, scale: 0.5 }}
            transition={{ duration: 0.3 }}
          >
            <Sun className="w-6 h-6 text-yellow-500" />
          </Motion.div>
        )}
      </AnimatePresence>
    </button>
        {isAuthenticated ?<><img src="src\assets\spider-logo.png" alt="" className="size-12 rounded-3xl" /> <button onClick={loGout} className="text-black border-[#0A3D91] border-2 p-4 rounded-3xl broder-[#C0C0C0] transition-all duration-200 ease-out hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[8px_8px_0px_0px_#000] hover:bg-[#0A3D91] hover:text-white">
          Logout
        </button> </>: <button
          onClick={() => navigate("/auth")}
          className="bg-[#0A3D91] p-4 rounded-xl text-black transition-all duration-200 ease-out hover:translate-x-[-4px] hover:text-white hover:translate-y-[-4px] hover:shadow-[8px_8px_0px_0px_#000]"
        >
          Get Started
        </button>}
      </div>
    </header>
  );
}

export default Header;
