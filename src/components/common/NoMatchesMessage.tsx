import { FC } from "react";

import { NoMatchesMessageProps } from "../PropInterfaces";

const NoMatchesMessage: FC<NoMatchesMessageProps> = ({ modelName }) => {
  return (
    <div className="no-matches-message warning-message">
      <h1>Oh no!</h1>

      <p>
        There aren't any {modelName}s that match your search criteria. Try broadening
        what you're looking for.
      </p>
    </div>
  );
};

export default NoMatchesMessage;