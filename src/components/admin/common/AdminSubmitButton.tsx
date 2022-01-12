import { FC } from 'react';

import { FaPencilAlt, FaSave } from 'react-icons/fa';
import { RiErrorWarningFill } from 'react-icons/ri';

import { AdminButtonProps } from '../../PropInterfaces';

const AdminSubmitButton: FC<AdminButtonProps> = ({ emptyFields, modelName, verb }) => {
  return (
    <>
      <button id="form-submission" className="admin-button centered-content-with-icon">
        {
          verb === "Edit" ? 
          (<FaSave />) :
          (<FaPencilAlt />)
        }
        {verb} {modelName}
      </button>
      
      {
      // <span 
      //   className={`admin-submit-button-warning centered-content-with-icon 
      //             ${emptyFields ? "active-submit-warning" : ""}`}
      // >
      //   <RiErrorWarningFill />
      //   Please ensure all required fields are provided.
      // </span>
      }
    </>
  );
};

export default AdminSubmitButton;