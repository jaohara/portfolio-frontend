import { FC } from "react";

import { AdminCheckBoxProps } from "../../PropInterfaces";

import AdminCheckBox from "./AdminCheckBox";

/*
  AdminInputCheckBox:

    An AdminCheckBox for use in a form. Just an AdminCheckBox 
    wrapped in a paragraph with an appropriate className.
*/
const AdminInputCheckBox: FC<AdminCheckBoxProps> = 
({ defaultValue, id, label, noMargin, onChange, value }) => {
  return (
    <p className="admin-input-checkbox-wrapper">
      <AdminCheckBox
        //defaultValue={defaultValue}
        id={id}
        label={label}
        noMargin={noMargin}
        onChange={onChange}
        value={value}
      />
    </p>
  );
};

export default AdminInputCheckBox;