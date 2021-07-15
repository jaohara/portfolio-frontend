// router imports
import {
  Route,
  Switch
} from "react-router-dom";

// common page components
import Footer from './common/Footer';
import PageHeader from './common/PageHeader';

// page route components
import About from "./about/About";
import Blog from "./blog/Blog";
import Home from "./home/Home";

function App() {
  return (
    <div className="main-wrapper">
      <PageHeader />

      <Switch>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/blog">
          <Blog />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
