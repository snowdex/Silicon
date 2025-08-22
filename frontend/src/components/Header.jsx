import {React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence} from "framer-motion"
import { Sun, Moon } from "lucide-react";
import { motion as Motion } from "framer-motion";
import { useSelector } from "react-redux";

function Header() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state)=> state.auth);
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => setDarkMode(!darkMode);

  return (
    <header className="flex items-center justify-between w-full p-6 h-fit shadow-lg ">
      <Link
        to="/Home"
        className="text-xl new-font hover:text-purple-600 cursor-pointer"
      >
        CTRL
      </Link>
      {/* <h2 className="text-xl new-font hover:text-purple-600 cursor-pointer">CTRL</h2> */}
      <div className="flex items-center justify-evenly gap-4">
        <ul className="flex gap-3 new-font2">
          <Link to="/Home" className="hover:text-purple-600">
            Home
          </Link>
          <Link to="/school" className="hover:text-purple-600">
            School
          </Link>
          <Link to="/dashboard" className="hover:text-purple-600">
            Dashboard
          </Link>
          <Link to="/finance" className="hover:text-purple-600">
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
        {isAuthenticated ? <h2>Welcome {user?.username}</h2> : <button
          onClick={() => navigate("/login")}
          className="bg-purple-600 p-4 rounded-xl text-white"
        >
          Get Started
        </button>}
      </div>
    </header>
  );
}

export default Header;
