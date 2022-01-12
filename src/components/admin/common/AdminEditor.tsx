import { FC } from "react";

import AceEditor from "react-ace";
import 'ace-builds/src-noconflict/mode-markdown';
import 'ace-one-themes'

import { FaMarkdown } from "react-icons/fa";
import { RiErrorWarningFill } from "react-icons/ri";

import { AdminEditorProps } from "../../PropInterfaces";

import { printEmptyRequirementClass } from "../../common/Helpers";

/*
  AdminEditor - A component to avoid retyping all of the AceEditor 
    configuration props
*/
const AdminEditor: FC<AdminEditorProps> = 
({ className, defaultValue, emptyRequirement, label, name, onChange, placeholder, value }) => {  
  return (
    <>
      <label
        className=
          {`centered-content-with-icon left-margin admin-editor-label ${printEmptyRequirementClass(emptyRequirement, value)}`}
        htmlFor={name}
      >
        {label} <FaMarkdown />
      </label>
      <RiErrorWarningFill className="required-warning" />
      <AceEditor
        className={className}
        fontSize={18}
        mode="markdown"
        name={name}
        onChange={(e) => onChange !== undefined && onChange(e)}
        // Not sure if these look too tacky with the html label?
        // placeholder={placeholder}
        theme="one-dark"
        value={ value !== undefined ? value : ""}
        width="100%"
        wrapEnabled={true}
      />
    </>
  );
};

export default AdminEditor;