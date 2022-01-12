import { FC, useState } from 'react';

import { FaLock, FaUnlock } from 'react-icons/fa';
import { IoMdTrash } from 'react-icons/io';

import { AdminTableDeleteCellProps } from "../../PropInterfaces";

import { postData } from "../../common/Helpers";

const AdminTableDeleteCell: FC<AdminTableDeleteCellProps> = 
({ deletionKey, deletionRoute, deletionValue, successCallback }) => {
  const [ armed, setArmed ] = useState(false);

  const handleDeletion = () => {
    let data: { [key: string]: string|number|boolean } = {};
    data[deletionKey] = deletionValue;
    postData(deletionRoute, data);
    successCallback();
  };

  return (
    <td 
      className={`admin-table-delete-cell ${armed ? "armed" : ""}`}
      onClick={ (e) => armed ? handleDeletion() : setArmed(true) }
      onMouseLeave={ (e) => armed && setArmed(false) }
    >
      <span className="admin-table-delete-cell-lock">
        {
          armed ? (<FaUnlock />) : (<FaLock />)
        }
      </span>
      <IoMdTrash />
    </td>
  );
};

export default AdminTableDeleteCell;