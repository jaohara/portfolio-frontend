import { FC } from 'react';

import { GoCheck } from 'react-icons/go';

import { AdminCheckBoxProps } from "../../PropInterfaces";

/*
  AdminCheckBox:

    General purpose custom CheckBox implementation.
*/
const AdminCheckBox: FC<AdminCheckBoxProps> = ({ id, label = "", noMargin = false, onChange, value }) => {
  return (
    <label
      className={`admin-checkbox-wrapper ${noMargin ? "no-margin" : ""}`}
      htmlFor={id}
    >
      <input
        checked={value}
        className="admin-checkbox"
        id={id}
        onChange={(e) => {
          onChange !== undefined && onChange(!e.target.checked);
        }}
        type="checkbox"
      />
      <div className="admin-styled-checkbox">
        <GoCheck />
      </div>
      {label}
    </label>
  );
};

export default AdminCheckBox;
