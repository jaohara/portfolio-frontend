import React, { FC, useEffect, useState } from "react";

import { IoMdAddCircle } from "react-icons/io";

import { AdminTagContainerProps, AdminTagProps } from "../../PropInterfaces";
import { fetchData, notNullOrUndefined } from "../../common/Helpers";

import AdminTag from "./AdminTag";
import AdminTagInput from "./AdminTagInput";

const AdminTagContainer: FC<AdminTagContainerProps> = ({ model, modelId, tagSet, setTagSet }) => {
  const [ autocompleteTags, setAutocompleteTags ] = useState<AdminTagProps[]>();
  const [ currentTag, setCurrentTag ]             = useState("");
  const [ inputVisible, setInputVisible ]         = useState(false);

  // load all techs or categories - could this be a custom hook?
  useEffect(() => { getAllTags() }, []);

  const handleAddClick = (e: React.MouseEvent) => {
    e.preventDefault();

    setInputVisible(true);
    let tagInput = document.getElementById("admin-tag-input");
    // tagInput !== undefined && tagInput?.focus();
    // This is some garbage - using setTimeout makes this work, but just calling focus() doesn't.
    tagInput !== undefined && window.setTimeout(() => tagInput?.focus(), 0);
  }

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log(e);
  }

  const getAllTags = () => {
    let tagCollection: AdminTagProps[] = [];  
    let tagRoute = model === "Project" ? "/technologies/all" : "/categories/all";

    fetchData(tagRoute, () => {}, (data: AdminTagProps[]) => {
      data.forEach(item => tagCollection.push(item))
    });

    setAutocompleteTags(tagCollection);
  };
  
  return (
    <div className="admin-tag-container">
      {
        tagSet !== undefined && tagSet.map((tag) => (
          <AdminTag
            className={ currentTag.toLowerCase() === tag.name.toLowerCase() ? "tag-exists" :"" }
            containingSet={tagSet}
            key={tag.name}
            model={model}
            modelId={modelId}
            name={tag.name}
            setContainingSet={setTagSet}
          />
        ))
      }

      <span 
        className={`admin-tag-add centered-content-with-icon 
          ${ inputVisible ? "add-hidden" : ""}`}
        onClick={(e) => handleAddClick(e)}
        onFocus={(e) => handleAddClick(e as unknown as React.MouseEvent)}
        tabIndex={0}
      >
        <IoMdAddCircle />
      </span>

      <AdminTagInput 
        // what if I pass all matches in and have AdminTagInput determine bestMatch?
        //onSubmit={} //TODO: What am I trying to do here?
        allTags={autocompleteTags}
        currentTag={currentTag}
        model={model}
        modelId={modelId}
        refreshAllTags={getAllTags}
        setCurrentTag={setCurrentTag}
        setTagSet={setTagSet}
        setVisible={setInputVisible}
        tagSet={tagSet}
        visible={inputVisible}
      />
    </div>
  );
};

export default AdminTagContainer;