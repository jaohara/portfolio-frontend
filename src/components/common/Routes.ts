import About from "../about/About";
import Blog from "../blog/Blog";
import Portfolio from "../portfolio/Portfolio";

// Main app routes
const routes = [
  { 
    Component: About,
    name: "About", 
    model: "", 
    path: "/about",
    visible: true, 
  }, 
  { 
    Component: Blog, 
    model: "post", 
    name: "Blog", 
    path: "/blog",
    visible: true, 
  },
  { 
    Component: Portfolio,
    model: "project", 
    name: "Portfolio", 
    path: "/portfolio",
    visible: true, 
  },
  { 
    Component: About, 
    model: "", 
    name: "About", 
    path: "/", 
    visible: false,
  },
];

export default routes;