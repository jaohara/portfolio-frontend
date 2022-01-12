import { FC } from "react";

import { BiData } from "react-icons/bi";

import { AdminDataLengthProps } from "../../PropInterfaces";

const AdminDataLength: FC<AdminDataLengthProps> = ({ dataLength, modelName }) => {
  return (
    <p>
      <span className="data-length centered-content-with-icon">
        <BiData />
        Loaded {dataLength} {modelName.toLowerCase()}{dataLength !== 1 && "s"}
      </span>
    </p>
  );
};

export default AdminDataLength;