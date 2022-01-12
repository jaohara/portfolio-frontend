import { FC } from "react";

import { ModelTagContainerProps } from "../PropInterfaces";

import PostCategory from "../blog/PostCategory";
import ProjectTech from "../portfolio/ProjectTech";

import { notNullOrUndefined } from "../common/Helpers";

const ModelTagContainer: FC<ModelTagContainerProps> = ({ filter, model, setFilter, tags }) => {
  return (
    <div className={`model-tag-container 
      ${ model === "Post" ? "post-category-container" : "project-technology-container"}`}
    >
      {
        notNullOrUndefined(tags) && (
        model === "Post" ? 
        tags!.map(tag => (
          <PostCategory
            filter={filter}
            filterMatch={notNullOrUndefined(filter) && filter!.includes(tag.name)}
            key={`category-${tag.name.toLowerCase()}`}
            setFilter={setFilter}
            tag={tag.name}
          />
        )) :
        tags!.map(tag => (
          <ProjectTech
            filter={filter}
            filterMatch={notNullOrUndefined(filter) && filter!.includes(tag.name)}
            key={`technology-${tag.name.toLowerCase()}`}
            setFilter={setFilter}
            tag={tag.name}
          />
        )))
      }
    </div>
  )
};

export default ModelTagContainer;