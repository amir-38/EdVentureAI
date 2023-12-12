import "./NavbarStyles.css"

import { Link } from "react-router-dom";
function NavBar() {
  return <>
  <div className="navbar">

  <div className="hero">
        <img src="Edventure_AI_page-0001-removebg-preview.png" alt="" />
      </div>
          <div className="navigate">
        <Link to="/" className="link">
          Home
        </Link>
        <Link to="/about" className="link">
          About
        </Link>
        <Link to="/contact" className="link">
          Contact
        </Link>
        </div>
  </div>
      </>;
}
export default NavBar;