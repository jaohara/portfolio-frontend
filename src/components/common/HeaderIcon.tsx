import { FC } from 'react';

import { BiWind } from "react-icons/bi"
import { GiCoffeeMug } from "react-icons/gi";
import { RiCheckboxBlankCircleFill } from "react-icons/ri";

import { HeaderIconProps } from '../PropInterfaces';

const HeaderIcon: FC<HeaderIconProps> = ({ noMatches }) => {
  return (
    <span 
      className={`header-icon-wrapper ${noMatches ? "no-matches" : "has-matches"}`}
    >
      <GiCoffeeMug className="header-icon-shadow" />
      <RiCheckboxBlankCircleFill className="header-icon-color" />
      <GiCoffeeMug className="header-icon" />
      <BiWind className="header-icon-steam" />
    </span>
  );
};

export default HeaderIcon;