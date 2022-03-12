import { FC } from "react";

import { AdminInputProps } from "../../PropInterfaces";

import AdminInput from "./AdminInput";

const AdminInputFile: FC<AdminInputProps> = 
({ className, emptyRequirement = false, id, label, onChange, setValue, special, value }) => {
  return (
    <AdminInput
      className={className}
      emptyRequirement={emptyRequirement}
      id={id}
      label={label}
      onChange={onChange}
      setValue={setValue}
      special={special}
      type="file"
      value={value}
    />
  );
};

export default AdminInputFile;