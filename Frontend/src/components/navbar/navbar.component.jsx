import burgerMenuSvg from "../../assets/burgerMenu.svg"
import { useState } from "react";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg fixed w-full z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <a href="/" className="text-xl font-bold">Logo</a>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 text-black">
            <a href="/" className="hover:text-blue-500">Home</a>
            <a href="/about" className="hover:text-blue-500">About</a>
            <a href="/contact" className="hover:text-blue-500">Contact</a>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              <img src={burgerMenuSvg} alt="Menu"  className="w-6 h-6"/>
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 text-black">
              <a href="/" className="block px-3 py-2 hover:bg-gray-50">Home</a>
              <a href="/about" className="block px-3 py-2 hover:bg-gray-50">About</a>
              <a href="/contact" className="block px-3 py-2 hover:bg-gray-50">Contact</a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};