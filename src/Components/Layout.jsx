import { NavLink, Outlet } from "react-router-dom";
import logo from '../assets/logo.png';

const Layout = () => {
  const linkStyle = ({ isActive }) =>
    `my-4 rounded w-[90%] text-lg py-2 block ${
      isActive ? "bg-green-500 font-bold" : "hover:bg-green-500 hover:font-bold"
    }`;

  return (
    <div className="grid grid-cols-12 min-h-screen">
      {/* Sidebar */}
      <div className="col-span-2 p-4 bg-blue-950 text-center text-white">
        <div className="flex justify-center mb-10">
          <img className="w-[100px] h-[100px]" src={logo} alt="Logotip" />
        </div>

        <NavLink to="/products" className={linkStyle}>Products</NavLink>
        <NavLink to="/category" className={linkStyle}>Category</NavLink>
        <NavLink to="/discount" className={linkStyle}>Discount</NavLink>
        <NavLink to="/sizes" className={linkStyle}>Sizes</NavLink>
        <NavLink to="/products" className={linkStyle}>Colors</NavLink>
        <NavLink to="/category" className={linkStyle}>Faq</NavLink>
        <NavLink to="/discount" className={linkStyle}>Contact</NavLink>
        <NavLink to="/products" className={linkStyle}>Team</NavLink>
        <NavLink to="/sizes" className={linkStyle}>News</NavLink>
      </div>

      {/* Content */}
      <div className="col-span-10 p-4 bg-gray-200">
        {/* <Outlet /> */}
      </div>
    </div>
  );
};

export default Layout;
