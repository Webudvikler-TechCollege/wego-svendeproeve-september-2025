import burgerMenuSvg from "../../assets/burgerMenu.svg"
import { useState } from "react";
import wegoLogo from "../../assets/wegoLogo.svg"
import { useAuth } from "../providers/auth.provider";
import { NavLink } from "react-router";
import { LoginModal } from "../loginModal/loginModal";
import { useLoginModal } from "../loginModal/useLoginModal";
import FormComponent from "../loginForm/loginForm.component";
import homeIcon from "../../assets/homeIcon.svg"
import searchIcon from "../../assets/searchIcon.svg"

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { loginData, logout } = useAuth();
  const { loginModalHandler } = useLoginModal();


  return (
    <nav className="bg-white shadow-lg fixed w-full z-50">
      <div className=" mx-auto px-16 py-4 ">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-end gap-8">
            <NavLink to="/" className="text-xl font-bold">
              <img src={wegoLogo} alt="Logo" className="h-16" />
            </NavLink>
            {/* Desktop Menu */}
            <div className="hidden gap-8 md:flex text-black py-2">
              <NavLink to="/about" className="hover:bg-off-white p-2 rounded-2xl transition">Find et lift</NavLink>
              <NavLink to="/contact" className="hover:bg-off-white p-2 rounded-2xl transition">Sådan virker det</NavLink>
              {loginData && <NavLink to="/profile" className="hover:bg-off-white p-2 rounded-2xl transition">Min side</NavLink>}
            </div>
          </div>

          <div className=" hidden md:flex">
            {loginData ? (
              <NavLink to="/" onClick={logout} className="btn btn-primary">
                Logout
              </NavLink>
            ) : (
              <>
                <button onClick={loginModalHandler} className="btn btn-primary">
                  Login
                </button>

              </>
            )}
          </div>



          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              <img src={burgerMenuSvg} alt="Menu" className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden px-12 fixed z-30 w-screen h-screen top-0 left-0 items-center justify-center bg-white transition-all duration-500 ease-in-out ${isOpen ? 'translate-x-0 pointer-events-auto' : 'translate-x-full pointer-events-none'}`}>
          <div className="h-full pt-32 pb-3 space-y-1 sm:px-3 text-black flex flex-col">
            <NavLink onClick={() => setIsOpen(false)} to="/" className="hover:bg-off-white p-2 rounded-2xl transition text-black"><img src={homeIcon} alt="Home" className="inline-block mr-2" />Forside</NavLink>
            <NavLink onClick={() => setIsOpen(false)} to="/contact" className="hover:bg-off-white p-2 rounded-2xl transition text-black"><img src={searchIcon} alt="Search" className="inline-block mr-2" />Find et lift</NavLink>
            {loginData && <NavLink onClick={() => setIsOpen(false)} to="/profile" className="hover:bg-off-white p-2 rounded-4xl transition text-black">Min side</NavLink>}
            {loginData ? (
              <NavLink to="/" onClick={logout} className="btn btn-primary">
                Logout
              </NavLink>
            ) : (
              <>
                <div onClick={(e) => e.stopPropagation()} className="pt-2 pointer-events-auto">
                  
                  <h2 className="login-title text-black">Log ind</h2>
                  <FormComponent isSignUp={false} />
                </div>
              </>
            )}

          </div>
          <button onClick={() => setIsOpen(!isOpen)} className="modal-close">×</button>
        </div>
      </div>
    </nav>
  );
};