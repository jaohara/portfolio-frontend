import { FC, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { IoMdArrowRoundBack } from "react-icons/io";

import { HeaderProps } from "../PropInterfaces";

import { notNullOrUndefined } from "./Helpers";

import ModelControlsFilter from "./ModelControlsFilter";
import ModelControlsSearch from "./ModelControlsSearch";
import ModelControlsSort from "./ModelControlsSort";

import routes from "../common/Routes";

import { ActiveMenuType, MenuControls } from "../Types";

const ModelControls: FC<HeaderProps> = 
({ filter, filterValue, inModelView, isScrolled, page, searchValue, setFilter, setFilterValue, 
  setSearchValue, setSortColumn, sortColumn, usedCategories, usedTechnologies }) => {
  const [ menuControls, setMenuControls ] = useState<MenuControls[]>([]);
  const [ menuActive, setMenuActive ]     = useState<ActiveMenuType>(null);

  const history = useHistory();

  const cleanInputsAndSetMenuActive = (newMenuActive: ActiveMenuType) => {
    // filterValue !== "" && setFilterValue("");
    setFilterValue("");
    // searchValue !== "" && setSearchValue("");
    setSearchValue("");
    // menuActive  !== newMenuActive && setMenuActive(newMenuActive);
    setMenuActive(newMenuActive);
  };

  useEffect(() => {
    window.addEventListener("click", (e) => {
      /*
        This idea is from a stack overview answer, but it's absolutely brilliant. If a click
        target doesn't match these CSS rules that select this component and its children,
        then close any active menu.
      */

      let target = e.target as HTMLElement;

      console.log("Click Detected: ");
      console.log(target);

      if (!target.matches(".model-controls-filter-line-item")) {
        console.log("Performing test...");
        let test = !target.matches('#model-controls, #model-controls *, .model-controls-filter-line-item') && 
        ((menuActive === "search" && searchValue.length < 1) || menuActive !== "search");

        if (test) {
          console.log("Test passed, cleaning inputs...");
          cleanInputsAndSetMenuActive(null);
        }
      }
    });
  }, []);

  // reset menus if the scroll goes up
  useEffect(() => {
    cleanInputsAndSetMenuActive(null);
  }, [isScrolled]);

  return (
    <div 
      className={`header-wrapper content-wrapper model-controls 
        ${page === "Blog" || page === "Portfolio" ? "model-controls-active" : "model-controls-hidden"}
        ${searchValue.length > 0 || filter.length > 0 ? "hide-lock": ""}`}
      id="model-controls"
    >
      <div 
        className={`model-top-level-controls header-wrapper
          model-top-level-controls-${!inModelView ? "visible" : "hidden"}`}
      >
        <div className="model-top-level-controls-left">
          <ModelControlsSort
            menuActive={menuActive}
            menuControls={menuControls}
            sortColumn={sortColumn}
            // setMenuActive={cleanInputsAndSetMenuActive}
            setMenuActive={setMenuActive}
            setMenuControls={setMenuControls}
            setSortColumn={setSortColumn}
          />

          <ModelControlsFilter
            filter={filter}
            filterValue={filterValue}
            menuActive={menuActive}
            menuControls={menuControls}
            page={page}
            setFilter={setFilter}
            setFilterValue={setFilterValue}
            setMenuActive={setMenuActive}
            // setMenuActive={cleanInputsAndSetMenuActive}
            setMenuControls={setMenuControls}
            usedCategories={usedCategories} 
            usedTechnologies={usedTechnologies}
          />
        </div>

        <ModelControlsSearch
          menuActive={menuActive}
          menuControls={menuControls}
          searchValue={searchValue}
          setMenuActive={setMenuActive}
          // setMenuActive={cleanInputsAndSetMenuActive}
          setMenuControls={setMenuControls}
          setSearchValue={setSearchValue}
        />
      </div>

      <div 
        className={`model-view-controls header-wrapper 
          model-view-controls-${inModelView ? "visible" : "hidden"}`}
      >
        {
          // TODO: This is the final control to component-ize
        }
        <span 
          className="model-view-controls-back model-controls-button centered-content-with-icon-inline"
          onClick={(e) => {
            e.preventDefault();
            let destination = routes.filter(r => r.name === page)[0];
            notNullOrUndefined(destination) && history.push(destination.path);
          }}
        >
          <IoMdArrowRoundBack />
        </span>
      </div>
    </div>
  );
};

export default ModelControls;
