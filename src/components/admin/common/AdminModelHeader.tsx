import { FC } from "react";

import { FaFileAlt, FaFileCode, FaFileImage, FaFileSignature } from "react-icons/fa";

import { AdminModelHeaderProps } from "../../PropInterfaces";

const AdminModelHeader: FC<AdminModelHeaderProps> = ({ modelName }) => {
  return (
    <h1 className="centered-content-with-icon">
      {
        modelName === "Post" ? ( <FaFileSignature /> ) :
        modelName === "Page" ? ( <FaFileAlt /> ) :
        modelName === "Project" ? (<FaFileCode />) :
        ( <FaFileImage /> )
      }
      { modelName }s
    </h1>
  );
};

export default AdminModelHeader;