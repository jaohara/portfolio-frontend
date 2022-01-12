import { FC } from 'react';

import { MdCancel } from 'react-icons/md';

import { FilterTagProps } from '../PropInterfaces';

const FilterTag: FC<FilterTagProps> = ({ filter, tag, setFilter }) => {
  const onDelete = () => setFilter(filter.filter(item => item !== tag));

  return (
    <span 
      className="model-tag filter-match filter-tag centered-content-with-icon-inline"
      onClick={onDelete}
    >
      {tag}
      <MdCancel />
    </span>
  );
};

export default FilterTag;