import { FC } from 'react';

import { FiSettings } from "react-icons/fi";

import { AdminLoadingProps } from '../../PropInterfaces';

const AdminLoading: FC<AdminLoadingProps> = ({ destination }) => {
  return(
    <div className={`admin-loading-animation ${destination}`}>
      <FiSettings className='loading-rotate'/>
    </div>
  )
};

export default AdminLoading;