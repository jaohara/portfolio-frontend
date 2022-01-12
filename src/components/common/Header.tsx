import { FC } from "react";
import { useHistory } from "react-router-dom";

import { HeaderProps } from "../PropInterfaces";

import HeaderIcon from "./HeaderIcon";
import ModelControls from "./ModelControls";
import NavBar from './NavBar';

import { getPageClass } from "./Helpers";

const Header: FC<HeaderProps> = 
({ filter, filterValue, inModelView, isScrolled, noMatches, page, searchValue, 
  setFilter, setFilterValue, setSearchValue, setSortColumn, sortColumn, 
  usedCategories, usedTechnologies }) => {
  const history = useHistory();
  
  return(
    <header
      className={`${isScrolled ? "header-scrolled-down" : "header-scrolled-up"} ${getPageClass(page)}`}
    >
      <div className="main-header header-wrapper content-wrapper">
        <h1 
          className="header-title centered-content-with-icon"
          onClick={() => history.push("/")}
        >
          <span className="header-first-name">John</span> 
          <span className="header-last-name">O'Hara</span>
          <HeaderIcon 
            noMatches={noMatches !== undefined ? noMatches : false}
          />
        </h1>

        <NavBar 
          page={page}
          setFilter={setFilter}
          setSearchValue={setSearchValue}
        />
      </div>

      <ModelControls
        filter={filter}
        filterValue={filterValue}
        inModelView={inModelView}
        page={page}
        searchValue={searchValue}
        setFilter={setFilter}
        setFilterValue={setFilterValue}
        setSearchValue={setSearchValue}
        setSortColumn={setSortColumn}
        sortColumn={sortColumn}
        usedCategories={usedCategories}
        usedTechnologies={usedTechnologies}
      />
    </header>
  );
};

export default Header;