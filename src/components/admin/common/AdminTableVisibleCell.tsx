import { FC, useState } from "react";

import { MdVisibility, MdVisibilityOff } from "react-icons/md";

import { AdminTableVisibleCellProps } from "../../PropInterfaces";

import { postData } from '../../common/Helpers';

const AdminTableVisibleCell: FC<AdminTableVisibleCellProps> = 
({ initialVisibility, invertedModel = false, primaryKey, toggleRoute, toggleKey }) => {
  const [ visible, setVisible ]   = useState(initialVisibility);

  const handleToggle = () => {
    /*
      I... don't completely follow why this is working, and
      that bothers me. 

      I think I flipped the meaning of certain model's boolean 
      fields - representing "hidden" and "visible" as a boolean
      are inverse ways of expressing of the same property - but
      it seems to be the opposite behavior if I make use of the
      invertedModel boolean to flip it back. So it was right 
      at the time?
      
      But it works? So I should leave it? I don't know what's 
      happening here, and I'm worried that might cause an issue
      down the road.
    */

    setVisible(!visible);

    let data: { [key: string]: string|number|boolean } = {};
    data["primary_key"] = primaryKey;
    // data[toggleKey]     = invertedModel ? !visible : visible;
    data[toggleKey]     = visible;

    console.log(`invertedModel: ${invertedModel}\n`)

    postData(toggleRoute, data);
    console.log(`
      toggleRoute: ${toggleRoute}
      data[primary_key]: ${data.primary_key} 
      data[${toggleKey}]: ${visible} 
    `);
    

    // successCallback, maybe?
  };

  return (
    <td
      className={`admin-table-visible-cell ${ visible ? "active" : ""}`}
      onClick={ (e) => handleToggle() }
    >
      {
        visible ? 
        (<MdVisibility />) :
        (<MdVisibilityOff className="admin-table-visible-cell-untoggled"/>)
      }
    </td>
  );
};

export default AdminTableVisibleCell;

