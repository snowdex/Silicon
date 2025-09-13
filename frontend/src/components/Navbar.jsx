import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  //Checking for scroll
  useEffect(()=>{
    const handleScroll = ()=>{
      if(window.scrollY > 50){
        setIsScrolled(true)
      }else{
        setIsScrolled(false)
      }
    }
    window.addEventListener("scroll", handleScroll);
    return ()=> window.removeEventListener("scroll", handleScroll)
  })

  return (
    <nav className={`bg-transparent w-full fixed p-4 z-50 ${isScrolled? "shadow-md": " "}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 text-2xl new-bold-font text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-pink-600 to-purple-600">
            SILICON
          </div>

          {/* Desktop Menu */}
          <div className="flex gap-10 items-center">
            <div className="hidden md:flex space-x-8 font-medium">
              <Link
                to={"/"}
                className="new-header-font text-lg text-gray-400 hover:text-purple-500"
              >
                Home
              </Link>
              <Link
                to={"/dashboard"}
                className="new-header-font text-lg text-gray-400 hover:text-purple-500"
              >
                Dashboard
              </Link>
              <Link
                to={"/data"}
                className="new-header-font text-lg text-gray-400 hover:text-purple-500"
              >
                Data
              </Link>
            </div>
            <div>
              <button
                className="px-6 py-4 rounded-xl bg-purple-500 text-white new-header-font font-semibold"
                onClick={() => navigate("/login")}
              >
                Get Started
              </button>
            </div>
          </div>
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg px-4 pb-4 space-y-2">
          <Link
            to={"/"}
            className="new-header-font text-lg hover:text-black block"
          >
            Home
          </Link>
          <Link
            to={"/dashboard"}
            className="new-header-font text-lg hover:text-black block"
          >
            Dashboard
          </Link>
          <Link
            to={"/data"}
            className="new-header-font text-lg hover:text-black block"
          >
            Data
          </Link>
        </div>
      )}
    </nav>
  );
}
