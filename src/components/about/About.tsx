import { Link } from "react-router-dom";

import routes from "../common/Routes";

const About = () => {
  let portfolioRoute = routes.filter(route => route.name === "Portfolio")[0].path;

  return (
    <div className="about-page page-content-wrapper">
      <div className="about-image-wrapper">
        <img className="about-image" src="Headshot.webp" alt="" />
      </div>

      <div className="about-text">
        <h1 className="about-header">Hi - I'm <span className="about-name">John O'Hara</span>, a Seattle-based Developer and Student.</h1>

        <p>
          I make things for the web, primarily using tools such as React, TypeScript, and SCSS. Projects that I've worked on can be seen in my <Link to={portfolioRoute}>Portfolio</Link>.
        </p>

        <p>
          When I'm not working at my computer I enjoy riding bicycles, playing guitar, and being super snobby about the coffee that I drink.
        </p>
      </div>
    </div>
  );
}

export default About;