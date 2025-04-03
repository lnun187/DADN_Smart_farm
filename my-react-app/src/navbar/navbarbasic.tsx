import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const isMainPage = location.pathname === "/user-profile";

  return (
    <nav
      className="bg-blue-700"
      style={{
        height: "60px",
        width:  "1696px",
        marginLeft: isMainPage ? "162px" : "0px",
      }}
    >
      <div className="flex items-center justify-between h-full mx-auto px-4">
        {/* Logo */}
        <Link
          to="/"
          className="text-white text-2xl font-bold"
          data-discover="true"
        >
          YourLogo
        </Link>

        {/* Menu items */}
        <div className="block">
          <div className="flex items-baseline" style={{ marginLeft: "200px" }}>
            <Link
              to="/"
              className="text-white hover:bg-blue-500 hover:text-black px-3 py-2 rounded-md text-sm font-medium"
              data-discover="true"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-white hover:bg-blue-500 hover:text-black px-3 py-2 rounded-md text-sm font-medium"
              data-discover="true"
              style={{ marginLeft: "200px" }}
            >
              About
            </Link>
            <Link
              to="/services"
              className="text-white hover:bg-blue-500 hover:text-black px-3 py-2 rounded-md text-sm font-medium"
              data-discover="true"
              style={{ marginLeft: "200px" }}
            >
              Services
            </Link>
            <Link
              to="/contact"
              className="text-white hover:bg-blue-500 hover:text-black px-3 py-2 rounded-md text-sm font-medium"
              data-discover="true"
              style={{ marginLeft: "200px" }}
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
