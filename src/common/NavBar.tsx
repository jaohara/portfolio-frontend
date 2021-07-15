import { Link } from "react-router-dom";

const NavBar = () => {
  return(
    <nav className="main-nav">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/blog">Blog</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>
    </nav>
  );
}

export default NavBar;