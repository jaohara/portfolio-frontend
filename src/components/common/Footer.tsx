import { FC } from "react";

import { SectionProps } from "../PropInterfaces";

import { getPageClass } from "./Helpers";

const Footer: FC<SectionProps> = ({ page }) => {
  return(
    <footer
      className={getPageClass(page)}
    >
      <p className="footer-text">
        &copy; 2021 John O'Hara
      </p>
    </footer>
  );
}

export default Footer;