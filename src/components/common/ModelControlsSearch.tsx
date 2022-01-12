import { FC, useRef, useState } from "react";

import { MdCancel, MdSearch } from "react-icons/md";

import { ModelControlsSearchProps } from "../PropInterfaces";

import { notNullOrUndefined } from "./Helpers";

const ModelControlsSearch: FC<ModelControlsSearchProps> = 
({ menuActive, menuControls, searchValue, setMenuActive, setMenuControls, setSearchValue}) => {
  const [ searchBarActive, setSearchBarActive ] = useState(false);

  const controlName = "search";

  const hide = () => {
    setSearchBarActive(false);
    setSearchValue("");
  }

  const show = () => {
    setSearchValue("");
    setSearchBarActive(true);
  }

  const toggle = () => {
    setSearchValue("");
    setMenuActive(menuActive === controlName ? null : controlName);
    focus();
  }

  const focus = () => document.getElementById("model-search")?.focus();

  const onBlurHandler = () => searchValue.length < 1 && 
    console.log(document.activeElement);
    // !(document.activeElement as HTMLElement).classList.contains("model-controls-search-button") 
    // && setMenuActive(null);

  const onClearHandler = () => {
    setSearchValue("");
    focus();
  };

  const printClassIfActive = (className: string) => menuActive === controlName && className;

  const searchInput = useRef<HTMLInputElement>(null);

  return (
    <div className="model-controls-search centered-content-with-icon">
      <span
        className={`model-controls-button model-controls-search-button no-margin 
          ${printClassIfActive("model-controls-button-active")}`} 
        onClick={() => toggle()}
      >
        {/* <FaSearch /> */}
        {/* <BiSearchAlt /> */}
        <MdSearch />
      </span>
      <span className="model-controls-search-input-wrapper centered-content-with-icon">
        <input 
          className={`model-controls-search-input model-controls-input
            ${printClassIfActive("model-controls-search-input-active")}`} 
          id="model-search"
          // onBlur={(e) => onBlurHandler()}
          onChange={(e) => setSearchValue(e.target.value)}
          ref={searchInput}
          type="text"
          value={searchValue}
        />

        <MdCancel
          className={`model-controls-search-clear
            model-controls-search-clear-${searchValue.length === 0 ? "hidden" : "visible"}`}
          onClick={() => onClearHandler()}
        />
      </span>
    </div>
  );
};

export default ModelControlsSearch;