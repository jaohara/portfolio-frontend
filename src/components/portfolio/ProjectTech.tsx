import React, { FC } from 'react';

import { FaJava } from 'react-icons/fa';
import { GoGear } from 'react-icons/go';
import { GrMysql } from 'react-icons/gr';
import { IoLogoSass } from 'react-icons/io';
import { SiJavascript, SiReact, SiTypescript } from 'react-icons/si';

import { FilterTagProps } from "../PropInterfaces";

const ProjectTech: FC<FilterTagProps> = ({ filter, filterMatch, setFilter, tag: tech }) => {
  // some code reuse between here and PostCategory - maybe I should make a more generic tag type?
  const toggleFilter = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFilter(filter.includes(tech) ? filter.filter(currentTag => currentTag !== tech) 
      : [...filter, tech]);
  }

  
  const techMap: {[key: string]: any} = {
    "mysql": (<GrMysql />),
    "java": (<FaJava />),
    "javascript": (<SiJavascript />),
    "react": (<SiReact />),
    "sass": (<IoLogoSass />),
    "scss": (<IoLogoSass />),
    "sql": (<GrMysql />),
    "typescript": (<SiTypescript />),
  }

  return (
    <span 
      className={`project-meta-tech model-tag ${filterMatch ? "filter-match" : ""}`}
      onClick={(e) => toggleFilter(e)}  
    >
      {
        Object.keys(techMap).includes(tech.toLowerCase()) ? 
        techMap[tech.toLowerCase()] : (<GoGear />)
      }
      {tech}
    </span>
  );
}

export default ProjectTech;