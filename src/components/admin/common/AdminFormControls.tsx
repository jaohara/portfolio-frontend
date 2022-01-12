import { FC, useEffect, useState } from "react";

import { FaFileAlt, FaFileCode, FaFileSignature } from "react-icons/fa";
import { RiErrorWarningFill } from "react-icons/ri";

import { AdminFormControlsProps } from "../../PropInterfaces";

import AdminBackButton from "./AdminBackButton";
import AdminSaveButton from "./AdminSaveButton";

const AdminFormControls: FC<AdminFormControlsProps> = 
({ backCallback, checkCallback, destination, emptyRequirement, model, submitCallback, verb }) => {
  const [ logMessage, setLogMessage ]   = useState("");

  useEffect(() => {
    emptyRequirement && 
      logMessage !== "required" && 
      logMessage !== "discard" && 
      setLogMessage("required")
    !emptyRequirement && logMessage === "required" && setLogMessage("");
  });

  return ( 
    <>
    <div className="admin-form-visibility-hack"></div>
    <div className="admin-form-controls">
      <h1 className="admin-form-header centered-content-with-icon">
        {
          model === "Page" ? 
          (<FaFileAlt />) : 
          model === "Post" ?
          (<FaFileSignature />) :
          (<FaFileCode />)
        }
        {verb} {model}
      </h1>

      <p>
        <AdminBackButton
          backCallback={backCallback}
          checkCallback={checkCallback}
          destination={destination}
          log={logMessage}
          setLog={setLogMessage}
        />

        <AdminSaveButton
          log={logMessage}
          setLog={setLogMessage} 
          submitCallback={submitCallback}
          verb={verb}
        />

        <span
          className={`admin-form-controls-log ${logMessage !== "" ? "log-active" : ""}`}
        >
          <RiErrorWarningFill />
          {
            // I don't think this is the best approach
            logMessage === "required" ? 
            ("Please ensure all required fields are provided.") :
            logMessage === "discard" ? 
            ("Discard unsaved changes?") : ""
          }
        </span>
      </p>
    </div>
    </>
  );
};

export default AdminFormControls;