import { FC } from "react";

import { AdminTableTooltipCellProps } from "../../PropInterfaces";

// A Component for a table header cell that displays a tooltip on hover.
const AdminTableTooltipCell: FC<AdminTableTooltipCellProps> = 
({ cellContent, tooltipText }) => {
  return (
    <th className="admin-table-small-cell admin-tooltip">
      {cellContent}
      <span className="admin-tooltip-text">
        {tooltipText}
      </span>
    </th>
  );
};

export default AdminTableTooltipCell;