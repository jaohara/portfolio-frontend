import { FC, useState } from "react"; 
import { Link } from "react-router-dom";

import { FaDoorOpen, FaRegFolder, FaRegFolderOpen } 
  from "react-icons/fa";
import { FiSettings } from "react-icons/fi";

import { AdminSideBarProps } from "../PropInterfaces";

// TODO: Move activePage up to the main app level to fix the closed folder bug
//    wait, couldn't I just grab it from the URL, mapping them to an object?
const AdminSideBar: FC<AdminSideBarProps> = ({ /*activePage, */ adminRoutes, borderChangeCallback, fetchAllData }) => {
  const [ activePage, setActivePage ]   = useState("/admin");
  
  return(
    <div 
      className={`admin-panel-sidebar`}
    >
      <div className="admin-panel-sidebar-content-wrapper">
        <Link 
          className="home-link"
          key="home-link"
          onClick={ (e) => {
            borderChangeCallback("home");
            setActivePage("/admin");
          }}
          to="/admin" 
        >
          <span className="sidebar-header centered-content-with-icon">
            <FiSettings className="rotate"/> Admin Panel
          </span>
        </Link>

        <nav>
          <ul>
            {
              adminRoutes !== undefined && 
              adminRoutes.map(({ path, name }) => (
                <li>
                  <Link 
                    className={`
                      sidebar-link 
                      ${name.toLowerCase()}-link 
                      centered-content-with-icon
                      ${ activePage === path && "sidebar-link-active"}
                      `}
                    key={name}
                    onClick={ (e) => setActivePage(path) }
                    to={path}
                  >
                    { activePage === path ? <FaRegFolderOpen /> : <FaRegFolder /> } {name}
                  </Link>
                </li>
              ))
            }

            <li>
              <Link 
                className="sidebar-link sidebar-exit-link centered-content-with-icon" 
                key="exit-link"
                onClick={() => fetchAllData()}
                to="/"
              >
                <FaDoorOpen />
                Exit
              </Link>
            </li>
          </ul>
        </nav>

      </div>
    </div>
  );
};

export default AdminSideBar;