import { FC, useEffect, useState } from "react";

import { BiSort } from "react-icons/bi";

import { ModelControlsSortProps } from "../PropInterfaces";

import { MenuControls } from "../Types";

const ModelControlsSort: FC<ModelControlsSortProps> = 
({ menuActive, menuControls, sortColumn, setSortColumn, setMenuActive, setMenuControls }) => {
  const [ sortMenuActive, setSortMenuActive ]  = useState(false);

  const controlName = "sort";

  const hide    = () => setSortMenuActive(false);
  const show    = () => setSortMenuActive(true);
  const toggle  = () => setMenuActive(menuActive === controlName ? null : controlName);

  const printClassIfActive = () => menuActive === controlName && 
    "model-controls-dropdown-active model-controls-button-active"

  const handleClick = () => {
    // TODO: flesh this out to handle what happens when you click a sort option
    setMenuActive(null);
  }
  
  // Register the child with parent to allow parent to toggle
  // useEffect(() => {
  //   let newMenuControl: MenuControls = {
  //     name: controlName,
  //     hide: hide,
  //   };

  //   setMenuControls([...menuControls, newMenuControl]);    
  // }, []);
  
  // useEffect(() => {
  //   sortMenuActive && menuControls.forEach(control => {
  //     console.log(`checking to hide ${control.name}...`);
  //     control.name !== controlName && control.hide();
  //   });
  // }, [sortMenuActive]);

  return (
    <div className="model-controls-sort centered-content-with-icon">
      <span 
        className={`model-controls-button model-controls-dropdown ${printClassIfActive()}`}
        onBlur={() => hide()}
        // onEnter={() => show()}
        // onMouseLeave={() => hide()}
        onClick={() => toggle()}  
      >
        <BiSort />
      </span>

      <div className="model-controls-sort-options model-controls-dropdown-options">
        <ul
          // TODO: Make a 
          onClick={() => handleClick()}
          // onMouseEnter={() => show()}
        >
          {
            /*
              TODO: These will have onClicks that call setSortColumn to set
              the sort column value at the app-level.
            */
          }
          <li>Modified</li>
          <li>Title</li>
          <li>Published</li>
        </ul>
      </div>
    </div>
  );
};

export default ModelControlsSort;