import { FC, useEffect, useRef, useState } from "react";

// Not sure if I'm a fan of doing things this way - there's redundancy between
// this and ProjectTech.
import { FaJava } from 'react-icons/fa';
import { GiFunnel } from "react-icons/gi";
import { GoGear } from 'react-icons/go';
import { GrMysql } from 'react-icons/gr';
import { ImPriceTag } from 'react-icons/im';
import { IoLogoSass } from 'react-icons/io';
import { SiJavascript, SiReact, SiTypescript } from 'react-icons/si';

import { ModelControlsFilterProps } from "../PropInterfaces";

import { MenuControls } from "../Types";

import FilterTag from "./FilterTag";

const ModelControlsFilter: FC<ModelControlsFilterProps> = 
({ filter, filterValue, menuActive, menuControls, page, setFilter, setFilterValue, 
  setMenuActive, setMenuControls, usedCategories, usedTechnologies }) => {

  const [ matchIndex, setMatchIndex ] = useState(0);

  const tagListLength = useRef(0);

  const controlName = "filter";

  const getModelTags = () => {
    const cleanFilter   = filterValue.replace("\\", "").toLowerCase();
    const existingTags  = filter.map(item => item.toLowerCase());
    let modelTags       = (page === "Blog" ? usedCategories : usedTechnologies)?.sort();
    
    // filter out existing 
    modelTags = modelTags !== undefined ? 
      modelTags.filter(tag => !existingTags.includes(tag.toLowerCase())) : [];

    // filter tags that match query
    modelTags = filterValue.length > 0 ? 
      modelTags.filter(tag => tag.toLowerCase().match(cleanFilter)) : modelTags;

    if (modelTags.length !== tagListLength.current) {
      tagListLength.current = modelTags.length;
      setMatchIndex(0);
    }

    return modelTags;
  }

  const hide    = () => { 
    setMenuActive(null);
    blur();
  };
  
  const show    = () => setMenuActive(controlName);

  const toggle  = () => {
    let menuActiveTest = menuActive !== controlName;
    setFilterValue("");
    setMenuActive(menuActiveTest ? controlName : null);
    menuActiveTest && focus();
  }

  const focus = () => document.getElementById("model-filter")?.focus();
  const blur  = () => (document.activeElement as HTMLElement).blur();

  // const onBlurHandler = () => filterValue.length < 1 && setMenuActive(null);

  const onClickHandler = (tagName: string, e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    // e.preventDefault();
    console.log(`adding ${tagName} to filter...`);
    setFilter([...filter, tagName]);
    hide();
  };

  const onKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // submit
    if (e.key === "Enter") {
      let newFilterTag = getModelTags()[matchIndex];
      !filter.includes(newFilterTag) && setFilter([...filter, newFilterTag]);
      setMatchIndex(0);
      hide();
    }
    else if (e.key === "\\") {
      e.preventDefault();
    }
    else if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      e.preventDefault();

      let newIndex = matchIndex + (e.key === "ArrowUp" ? -1 : 1);
      newIndex = newIndex < 0 ? tagListLength.current - 1 : newIndex;
      newIndex = newIndex > tagListLength.current - 1 ? 0 : newIndex;

      setMatchIndex(newIndex);
    }

  };

  const printClassIfActive = () => menuActive === controlName && 
    "model-controls-dropdown-active model-controls-button-active"

  const filterInput = useRef<HTMLInputElement>(null);

  const tagMap: {[key: string]: any} = {
    "mysql": (<GrMysql />),
    "java": (<FaJava />),
    "javafx": (<FaJava />),
    "javascript": (<SiJavascript />),
    "react": (<SiReact />),
    "sass": (<IoLogoSass />),
    "scss": (<IoLogoSass />),
    "sql": (<GrMysql />),
    "typescript": (<SiTypescript />),
  };

  return (
    <div className="model-controls-filter centered-content-with-icon">
      <div className="model-controls-current-filter centered-content-with-icon-inline">
        <span 
          className={`model-controls-button model-controls-dropdown ${printClassIfActive()}`}
          // className={`model-controls-button model-controls-dropdown model-controls-dropdown-active`}
          // onBlur={() => hide()}
          // onEnter={() => show()}
          // onMouseLeave={() => hide()}
          onClick={() => toggle()}  
        >
        
          <GiFunnel />
        </span>
        <input 
          className="model-controls-input model-controls-filter-input"
          id="model-filter"
          // onBlur={() => onBlurHandler()}
          onChange={(e) => setFilterValue(e.target.value)}
          onKeyDown={(e) => onKeyDownHandler(e)}
          onSubmit={(e) => console.log("ahem test test")}
          ref={filterInput}
          value={filterValue}
        />

        <div 
          className={`model-controls-filter-options model-controls-dropdown-options`}
        >
          { getModelTags().length > 0 && (
            <ul>
              {
                getModelTags().map((tag, i) => (
                  <li
                    className={`centered-content-with-icon model-controls-filter-line-item 
                      ${i === matchIndex ? "option-targetted" : ""}`}
                    key={tag}
                    onClick={(e) => onClickHandler(tag, e)}
                  >
                    {
                      page === "Blog" ? (<ImPriceTag />) :
                      Object.keys(tagMap).includes(tag.toLowerCase()) ?
                      tagMap[tag.toLowerCase()] : (<GoGear />)
                    }
                    {tag}
                  </li>
                )) 
              }
            </ul>
          )}
        </div>
        {
          filter.length > 0 && (
            <div className="model-controls-filter-current-tags">
              { 
                filter.map(tag => (
                  <FilterTag 
                    filter={filter}
                    filterMatch={true}
                    setFilter={setFilter}
                    tag={tag}
                  />
              ))}
            </div>
        )}
      </div>
    </div>
  );
};

export default ModelControlsFilter;