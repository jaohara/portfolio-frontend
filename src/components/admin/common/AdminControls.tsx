import { FC } from "react";
import { Link } from "react-router-dom";

import AdminCreateButton from "./AdminCreateButton";
import AdminModelHeader from "./AdminModelHeader";
import AdminSearchBar from "./AdminSearchBar";

import { AdminControlsProps } from '../../PropInterfaces';

const AdminControls: FC<AdminControlsProps> = ({filterOnChange, filterValue, modelName}) => {
  return (
    <div className="admin-model-controls">
      <AdminModelHeader
        modelName={modelName}
      />

      <p className="admin-controls">
        <Link to={`/admin/${modelName.toLowerCase()}s/create`}>
          <AdminCreateButton modelName={modelName} />
        </Link>

        <AdminSearchBar 
          onChange={filterOnChange}
          value={filterValue}
          />
      </p>
    </div>
  );
};

export default AdminControls;