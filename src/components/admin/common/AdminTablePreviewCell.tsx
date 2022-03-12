import { FC, useState } from "react";

import { BsImage } from "react-icons/bs";

import { AdminTablePreviewCellProps } from "../../PropInterfaces";

const AdminTablePreviewCell: FC<AdminTablePreviewCellProps> = ({ path }) => {
  const [ active, setActive ] = useState(false);

  // I suppose I'm not going to use this on mobile, so I only need to handle the hover effect
  
  return (
    <td
      className={`admin-table-preview-cell ${ active ? "active" : ""}`}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    >
      <BsImage />
    </td>
  );
};

export default AdminTablePreviewCell;