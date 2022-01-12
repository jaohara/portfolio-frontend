import { FC, useState } from "react";

import { Link } from "react-router-dom";

import { SectionProps } from "../PropInterfaces";

import routes from './Routes';

const NavBar: FC<SectionProps> = ({ page, setFilter, setSearchValue }) => {
  const [ , setActiveLink ]   = useState("Home");

  return(
    <nav className="main-nav">
      <ul className="main-nav-list">
        {
          routes.map(route => (
            route.visible && (
            <li 
              className="main-nav-list-item"
              key={route.name}
            >
              <Link
                key={route.name}
                onClick={ () => {
                  setActiveLink(route.name);
                  window.scrollTo(0, 0);
                  setFilter !== undefined && setFilter([]);
                  setSearchValue !== undefined && setSearchValue("");
                }}
                to={route.path}
                className={`main-nav-list-item-link ${page === route.name ? "active" : ""}`}
              >
                { route.name }
              </Link>
            </li>
          )))
        }
      </ul>
    </nav>
  );
}

export default NavBar;