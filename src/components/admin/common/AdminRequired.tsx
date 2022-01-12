import { RiErrorWarningFill } from 'react-icons/ri';

const AdminRequired = () => {
  return (
    <span className="admin-input-required centered-content-with-icon inline-flex">
      {
        // <RiErrorWarningFill /> Required
      }
      (Required)
    </span>
  );
};

export default AdminRequired;