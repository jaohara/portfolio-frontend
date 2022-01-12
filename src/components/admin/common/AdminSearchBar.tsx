import { FC } from 'react';

import { FaSearch } from 'react-icons/fa';
import { MdCancel } from 'react-icons/md';

import { AdminSearchBarProps } from '../../PropInterfaces';

const AdminSearchBar: FC<AdminSearchBarProps> = ({ onChange, value }) => {

  return (
    <label 
      className="admin-search-bar-wrapper centered-content-with-icon"
      htmlFor="admin-search-bar"
    >
      <FaSearch />
      <input 
        className={`admin-search-bar ${value.length > 0 ? "has-term" : ""}`}
        onChange={(e) => onChange(e.target.value)}
        id="admin-search-bar"
        type="text"
        value={value}
      />
      <span 
        className={`admin-search-bar-clear ${value.length > 0 ? "clear-armed" : ""}`}
        onClick={(e) => onChange("")}
      >
        <MdCancel />
      </span>
      {
        // TODO: Make this work - take in results count?
      }
      <span 
        className={`admin-search-error`}
      >
        No matches found.
      </span>
    </label>
  );
};

export default AdminSearchBar;