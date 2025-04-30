import { NavLink, Outlet } from "react-router-dom";
import logo from '../assets/admin-logo.png';

const Layout = () => {
  
  const linkStyle = ({ isActive }) =>
    `my-4 rounded w-[90%] text-[16px] py-2 block ${
      isActive ? "bg-green-500 font-bold" : "hover:bg-green-500 hover:font-bold"
    }`;

  return (
    <div className="grid grid-cols-12 min-h-screen">
      {/* Sidebar */}
      <div className="col-span-2 p-4 bg-gray-800 text-center text-white">
        <div className="flex justify-center mb-10">
          <img className="w-[80px] h-[80px]" src={logo} alt="Logotip" />
        </div>

        <NavLink to="/products" className={linkStyle}>Products</NavLink>
        <NavLink to="/category" className={linkStyle}>Category</NavLink>
        <NavLink to="/discount" className={linkStyle}>Discount</NavLink>
        <NavLink to="/sizes" className={linkStyle}>Sizes</NavLink>
        <NavLink to="/colors" className={linkStyle}>Colors</NavLink>
        <NavLink to="/faq" className={linkStyle}>Faq</NavLink>
        <NavLink to="/contact" className={linkStyle}>Contact</NavLink>
        <NavLink to="/team" className={linkStyle}>Team</NavLink>
        <NavLink to="/news" className={linkStyle}>News</NavLink>
      </div>

      {/* Content */}
      <div className="col-span-10 p-4 bg-gray-200 min-h-screen">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
