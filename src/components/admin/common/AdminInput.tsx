import { FC } from "react";

import { FaGithub, FaLink, FaMarkdown } from "react-icons/fa";
import { MdCancel } from 'react-icons/md';
import { RiErrorWarningFill } from "react-icons/ri";

import { AdminInputProps } from "../../PropInterfaces";

const AdminInput: FC<AdminInputProps> = 
({ className, emptyRequirement = false, id, label, onChange, setValue, special, value }) => {
  const printRequirement = (emptyCheck: boolean) => 
    emptyCheck ? "empty-requirement" : "";

  const printClearActive = () => value.length !== 0 ? "clear-active" : "";
  
  return (
    <p className="admin-input-text-wrapper">
      <label 
        className=
          {`admin-input-text-label admin-input-label centered-content-with-icon
          ${printRequirement(emptyRequirement)}`}
        htmlFor={id}
      >
        {label}
        {
          // fancy pants special label icons
          special !== undefined &&  special === "github" ? 
          (<FaGithub />)          : special === "markdown" ?
          (<FaMarkdown />)        : special === "url" ?
          (<FaLink />)            : ""
        }
      </label>
      <RiErrorWarningFill className="required-warning" />
      <p className="admin-input-and-clear-wrapper">
        <input
          className=
          {`admin-input-text ${printRequirement(emptyRequirement)} ${className}`}
          id={id}
          onChange={onChange}
          type="text"
          value={value}
          />

        <span
          className={`centered-content-with-icon admin-input-text-clear ${printClearActive()}`}
          onClick={() => setValue !== undefined && setValue("")}
          >
          <MdCancel />
        </span>
      </p>
    </p>
  );
};

export default AdminInput;