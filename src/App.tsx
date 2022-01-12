import { useEffect, useRef, useState } from "react";

// router imports
import { Route, Switch, useLocation } from "react-router-dom";

// css transition
import { CSSTransition } from 'react-transition-group';

// common page components
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import StaticPage from './components/static/StaticPage';

// Admin Route
import Admin from "./components/admin/Admin";

// App routes
import routes from "./components/common/Routes";


// Helper Methods
import { fetchData, getPageClass, notNullOrUndefined } from "./components/common/Helpers";


import { Page, Post, Project, Tag } from "./components/Types";

/*
  I should probably wrap this in an Auth0Context or whatever that tag is, but
  I'll cross that bridge when I start adding authentication.
*/
function App() {
  // General App State
  // const [ error, setError ]               = useState(null);
  const [ , setError ]                    = useState(null);
  const [ filter, setFilter ]             = useState<string[]>([]);
  const [ filterValue, setFilterValue ]   = useState(""); // value of the filter textbox
  const [ inModelView, setInModelView ]   = useState<boolean>(false);
  // const [ model, setModel ]               = useState("");
  const [ model,  ]                       = useState("");
  const [ page, setPage ]                 = useState("About");
  const [ searchValue, setSearchValue ]   = useState("");
  const [ sortColumn, setSortColumn ]     = useState("Title");

  const lastScroll = useRef<number>(0);
  const [ isScrolled, setIsScrolled ]     = useState<boolean>(false);


  const location = useLocation();

  // Model State
  const [ posts, setPosts ]                                           = useState<Post[]>([]);
  const [ postsLoaded, setPostsLoaded ]                               = useState(false);
  const [ postCategories, setPostCategories ]                         = useState<Tag[]>([]);
  const [ postCategoriesLoaded, setPostCategoriesLoaded ]             = useState(false);
  const [ projects, setProjects ]                                     = useState<Project[]>([]);
  const [ projectsLoaded, setProjectsLoaded ]                         = useState(false);
  const [ projectTechnologies, setProjectTechnologies ]               = useState<Tag[]>([]);
  const [ projectTechnologiesLoaded, setProjectTechnologiesLoaded ]   = useState(false);
  const [ staticPages, setStaticPages ]                               = useState<Page[]>([]);
  const [ staticPagesLoaded, setStaticPagesLoaded ]                   = useState(false);
  
  const getAllRoutes = () => {
    let allRoutes: any[] = [...routes];

    if (staticPagesLoaded) {
      staticPages.forEach(staticPage => {
        allRoutes.push({
          Component: StaticPage,
          content: staticPage.body,
          name: "Static",
          path: `/${staticPage.name}`,
          title: staticPage.pretty_name,
          visible: false,
        });
      });
    }

    return allRoutes;
  }

  const getPageFromPathName = () => {
    let matchedPage = 
      getAllRoutes().filter(route => route.path === `/${location.pathname.split("/")[1]}`)[0];
    
    //@ts-ignore
    return matchedPage === undefined ? "undefined" : matchedPage.name.replace(" ", "-");
  }

  const getFilteredPosts = () => getFilteredModel(posts, postCategories);

  const getFilteredProjects = () => getFilteredModel(projects, projectTechnologies);

  const getFilteredModel = (modelCollection: any[], modelTagCollection: any[]) => {
    let matchingData = [...modelCollection];
    
    // filter by category
    // alright, this works, but this is "or" - it should be "and"
    if (filter.length > 0) {
      let filteredIds: number[] = [];

      modelTagCollection.forEach(tag => {
        filter.map(item => item.toLowerCase()).includes(tag.name.toLowerCase()) && 
        filteredIds.push(tag.id);
      });

      matchingData = matchingData.filter(data => filteredIds.includes(data.id!));
    }

    // limit by search - just title right now, but maybe title and categories?
    if (searchValue.length > 0) {
      matchingData = 
        matchingData.filter(data => data.title?.toLowerCase().includes(searchValue.toLowerCase()));
    }

    return matchingData;
  }

  const getUsedTechnologies = () => getUsedTags(projectTechnologies);

  const getUsedCategories = () => getUsedTags(postCategories);

  const getUsedTags = (tagCollection: any[]) => {
    if (notNullOrUndefined(tagCollection)) {
      let tagNameSet: Set<string> = new Set<string>();
      //@ts-ignore
      tagCollection.forEach(tech => tagNameSet.add(tech.name))
      return [...tagNameSet];
    } 
  }

  const setPageIfNeeded = (newPage: string | undefined) => page !== newPage && page !== undefined 
    && setPage(newPage!);
  
  // const setModelIfNeeded = (newModel: string) => model !== newModel && setModel(newModel);  

  const fetchPosts = () => 
    fetchData("/posts/all", setPostsLoaded, setPosts, setError);

  const fetchProjects = () => 
    fetchData("/projects/all", setProjectsLoaded, setProjects, setError);

  const fetchStaticPages = () => 
    fetchData("/pages/visible", setStaticPagesLoaded, setStaticPages, setError);

  const fetchPostCategories = () =>
    fetchData("/posts/categories/all", setPostCategoriesLoaded, setPostCategories, setError);

  const fetchProjectTechnologies = () =>
    fetchData("/projects/technologies/all", setProjectTechnologiesLoaded, setProjectTechnologies, setError);

  const fetchAllData = () => { 
    fetchPosts(); 
    fetchProjects();
    fetchStaticPages();
    fetchPostCategories();
    fetchProjectTechnologies();
  };

  const allDataIsLoaded = () => postsLoaded && projectsLoaded &&
    projectTechnologiesLoaded && postCategoriesLoaded && staticPagesLoaded;

  useEffect(() => {
    fetchAllData();

    // bind scroll listener
    lastScroll.current = window.scrollY;

    window.addEventListener("scroll", (e) => {
      if (window.scrollY === 0) {
        setIsScrolled(false);
      }
      else {
        let scrollDistance  = window.scrollY - lastScroll.current;
        const scrollBarrier = 150;  // distance to cover to count as an "up" scroll
  
        if (scrollDistance !== 0) {
  
          let isScrolledDown = scrollDistance > 0;
  
          if (isScrolledDown || Math.abs(scrollDistance) >= scrollBarrier) {          
            lastScroll.current = window.scrollY;
            setIsScrolled(isScrolledDown);
          }
        }
      }
    });

    // bind escape for removing focus from input
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && document.activeElement !== null) {
        (document.activeElement as HTMLElement).blur();
      }
    });    
  }, []);

  useEffect(() => {
    setPageIfNeeded(getPageFromPathName());
    // console.log(getAllRoutes());
  });

  return (
    <div id="page-wrapper" className={`page-wrapper ${getPageClass(page)}`}>
      <Switch>
        <Route path="/admin">
          {
            // TODO: This route needs to be protected via auth0
          }
          <Admin 
            fetchAllData={fetchAllData}
          />
        </Route>

        { allDataIsLoaded() && ( <Route path="/">
          <Header
            filter={filter}
            filterValue={filterValue}
            noMatches={
              (searchValue.length > 0 || filter.length > 0) 
              && (page === "Blog" || page === "Portfolio")
              && page === "Blog" ? 
              postsLoaded && getFilteredPosts().length === 0 : 
              projectsLoaded && getFilteredProjects().length === 0
            }
            inModelView={inModelView}
            isScrolled={isScrolled}
            page={page}
            searchValue={searchValue}
            setFilter={setFilter}
            setFilterValue={setFilterValue}
            setInModelView={setInModelView}
            setSearchValue={setSearchValue}
            setSortColumn={setSortColumn}
            sortColumn={sortColumn}
            usedCategories={getUsedCategories()}
            usedTechnologies={getUsedTechnologies()}
          />

          <div id="main-content-wrapper" className="content-wrapper">
              { 
                // routes.map(({ Component, name, path }) => (
                getAllRoutes().map(({ Component, content, name, path, title }) => (
                  <Route key={path} exact={name !== "Blog" && name !== "Portfolio"} path={path}>
                    {
                      ({ match }) => (
                        <CSSTransition
                          classNames="page"
                          in={match !== null}
                          key={`page-${name.toLowerCase()}`}
                          timeout={400}
                          unmountOnExit
                        >
                          {
                            name !== "Static" ?
                            (
                              <Component
                                filter={filter}
                                inModelView={inModelView}
                                model={model}
                                page={page}
                                pagePath={path}
                                postCategories={postCategories}
                                postCategoriesLoaded={postCategoriesLoaded}
                                posts={getFilteredPosts()}
                                postsLoaded={postsLoaded}
                                projectTechnologies={projectTechnologies}
                                projectTechnologiesLoaded={projectTechnologiesLoaded}
                                projects={getFilteredProjects()}
                                projectsLoaded={projectsLoaded}
                                searchValue={searchValue}
                                setFilter={setFilter}
                                setInModelView={setInModelView}
                              />
                            ) :
                            (
                              <StaticPage
                                content={content}
                                pagePath={path}
                                title={title}
                              />
                            )
                          }
                          
                        </CSSTransition>
                    )}
                  </Route>
                ))
              }
          </div>

          <Footer 
            page={page}
          />
        </Route>)}
      </Switch>
    </div>
  );
};

export default App;
