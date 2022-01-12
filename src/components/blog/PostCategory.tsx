import { FC } from 'react';

import { ImPriceTag } from 'react-icons/im';

import { FilterTagProps } from "../PropInterfaces";

const PostCategory: FC<FilterTagProps> = ({ filter, filterMatch, tag: category, setFilter}) => {
  const toggleFilter = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFilter(filter.includes(category) ? filter.filter(currentTag => currentTag !== category) 
      : [...filter, category]); 
  }
  
  return (
    <span 
      className={`post-meta-category model-tag centered-content-with-icon-inline
        ${filterMatch ? "filter-match" : ""}`}
      onClick={(e) => toggleFilter(e)}
    >
      <ImPriceTag />
      {category}
    </span>
  );
};

export default PostCategory;