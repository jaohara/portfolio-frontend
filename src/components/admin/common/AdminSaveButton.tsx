import { FC } from "react";

import { FaPencilAlt } from "react-icons/fa";
import { RiSave3Fill } from "react-icons/ri";

import { AdminSaveButtonProps } from "../../PropInterfaces";

const AdminSaveButton: FC<AdminSaveButtonProps> = ({ log, setLog, submitCallback, verb }) => {
  return (
    <button 
      className="admin-button admin-form-button admin-save-button centered-content-with-icon"
      id="form-submission"
      onClick={submitCallback}
    >
      {
        verb === "Create" ? 
        (<FaPencilAlt />) :
        (<RiSave3Fill />)
      }
    </button>
  );
};

export default AdminSaveButton;