import { FC } from 'react';

import { PrettyDateProps } from '../PropInterfaces';

import { printPrettyDate } from '../../lib/helpers';

// do I need this?
/*
interface PrettyDateProps {
  date: string,
}*/

const PrettyDate: FC<PrettyDateProps> = ({ date, verb = "Published" }) => {
  return (
    <span className="pretty-date">
      {`${verb[0].toUpperCase()}${verb.slice(1)}`} on <span className="pretty-date-value">{ printPrettyDate(date) }</span>
    </span>
  );
}

export default PrettyDate;