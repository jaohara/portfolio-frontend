import { FC } from "react";

import {useHistory } from "react-router-dom";

import { FaFileAlt, FaFileCode, FaFileImage, FaFileSignature } from "react-icons/fa";
import { BiData } from "react-icons/bi";

import { AdminCardProps } from "../../PropInterfaces";

const AdminCard: FC<AdminCardProps> = ({ modelCount, modelName, modelRoute }) => {
  let cardIcons = {
    "post":     (<FaFileSignature />),
    "page":     (<FaFileAlt />),
    "project":  (<FaFileCode />),
    "image":    (<FaFileImage />),
  }

  let history = useHistory();

  return (
    <div 
      className={`admin-card ${modelName.toLowerCase()}-card`}
      onClick={() => history.push(modelRoute)}
    >
      <h1>{modelName}s</h1>
      <div className="admin-card-icon">
        { 
          // @ts-ignore 
          cardIcons[modelName.toLowerCase()]
        }
      </div>

      <span className="admin-card-count centered-content-with-icon">
        <BiData />
        <span className="admin-card-color"> {modelCount} {modelName}{ modelCount === 1 ? "" : "s"}</span> 
      </span>
    </div>
  );
};

export default AdminCard;