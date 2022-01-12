import { FC } from 'react';

import { RiDeleteBack2Fill } from 'react-icons/ri';

import { AdminTagProps } from '../../PropInterfaces';

import { postData } from '../../common/Helpers';

/* 
  This component represents both the Category and Technology tags
  that can be applied to Posts or Projects respectively. 
*/
const AdminTag: FC<AdminTagProps> = 
({ className, containingSet, model, modelId, name, setContainingSet }) => {
  const onDelete = () => {
    setContainingSet !== undefined && containingSet !== undefined &&
    setContainingSet(containingSet.filter(tag => tag.name !== name));

    if (modelId !== undefined && model !== undefined) {
      let deleteRoute = (model === "Project" ? `/projects/technologies` : `/posts/categories`) + "/delete";

      // dumb, but covers all of the bases
      let data = {
        category_name: name,
        post_id: modelId,
        project_id: modelId,
        technology_name: name,
      };

      postData(deleteRoute, data);
    }
  };
  
  return (
    <span className={`admin-tag ${className !== undefined ? className : "" }`}>
      { name }

      <span 
        className="admin-tag-delete"
        onClick={(e) => onDelete()}
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && onDelete()}
      >
        <RiDeleteBack2Fill />
      </span>
    </span>
  );
}

export default AdminTag;