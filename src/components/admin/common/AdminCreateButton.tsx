import { FC } from "react";

import { FaPencilAlt } from "react-icons/fa";

import { AdminButtonProps } from "../../PropInterfaces";

const AdminCreateButton: FC<AdminButtonProps> = ({ modelName, onClick }) => {
  return (
    <button 
      className="admin-button admin-create-button centered-content-with-icon"
      id="model-create-button"
    >
      {
        //<FaPencilAlt /> Create {modelName}
      }
      <FaPencilAlt /> Create
    </button>
  );
}

export default AdminCreateButton;