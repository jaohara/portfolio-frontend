import { FC } from "react";
import { useHistory } from "react-router-dom";

import { BiArrowBack } from "react-icons/bi";

import { AdminBackButtonProps } from "../../PropInterfaces";

import { unbindFormSubmissionHotkey } from "../../common/Helpers";

const AdminBackButton: FC<AdminBackButtonProps> = 
({ backCallback, checkCallback, destination, log, setLog }) => {
  let history = useHistory();

  return (
    <>
      <button 
        className="admin-button admin-form-button admin-back-button centered-content-with-icon"
        onClick={(e) => {
          if (checkCallback !== undefined && checkCallback !== null 
            && log !== "discard" && !checkCallback()){
            setLog !== undefined && setLog("discard");
          }
          else {
            unbindFormSubmissionHotkey();
            backCallback();

            destination !== undefined && destination !== null ? 
              history.push(destination) : history.goBack();
          }
        }}
        onMouseLeave={() => setLog !== undefined && setLog("")}
      >
        <BiArrowBack />
      </button>
    </>
  );
};

export default AdminBackButton;