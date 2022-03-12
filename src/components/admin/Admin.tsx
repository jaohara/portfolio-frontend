import { FC, useEffect, useState } from 'react';

import { Route } from "react-router-dom";

import { CSSTransition } from 'react-transition-group';

import { AdminPageProps } from '../PropInterfaces';

import { fetchData } from '../common/Helpers';

import AdminCard from './common/AdminCard';
import AdminSideBar from "./AdminSideBar";
import AdminLoading from './common/AdminLoading';

import PageAdmin from "./PageAdmin";
import PostAdmin from "./PostAdmin";
import ProjectAdmin from "./ProjectAdmin";
import ImageAdmin from "./ImageAdmin";

const Admin: FC<AdminPageProps> = ({ fetchAllData }) => {
  const [ imagesSize, setImagesSize]              = useState(0);
  const [ imagesLoaded, setImagesLoaded ]         = useState(false);
  const [ pagesSize, setPagesSize ]               = useState(0);
  const [ postsSize, setPostsSize ]               = useState(0);
  const [ projectsSize, setProjectsSize ]         = useState(0);
  const [ pagesLoaded, setPagesLoaded ]           = useState(false); 
  const [ postsLoaded, setPostsLoaded ]           = useState(false);
  const [ projectsLoaded, setProjectsLoaded ]     = useState(false);
  const [ topBorderClass, setTopBorderClass ]     = useState("home");

  const parseDataSetLength = (data: any[]) =>
    data.length === undefined || data.length === null ? 0 : data.length;

  useEffect(() => {
    fetchData("/pages/all", () => {}, (data: any) => {
      setPagesSize(parseDataSetLength(data));
      // setPagesSize(data.length === undefined || data.length === null ? 0 : data.length);
      setPagesLoaded(true);
    });

    fetchData("/posts/all", () => {}, (data: any) => {
      setPostsSize(parseDataSetLength(data));
      // setPostsSize(data.length === undefined || data.length === null ? 0 : data.length);
      setPostsLoaded(true)
    });

    fetchData("/projects/all", () => {}, (data: any) => {
      setProjectsSize(parseDataSetLength(data));
      // setProjectsSize(data.length === undefined || data.length === null ? 0 : data.length);
      setProjectsLoaded(true);
    });

    fetchData("/images/all", () => {}, (data: any) => {
      setImagesSize(data.length === undefined || data.length === null ? 0: data.length)
      // setImagesSize(data.length === undefined || data.length === null ? 0: data.length)
      setImagesLoaded(true);
    })
  }, []);

  const adminRoutes = [
    { path: "/admin/pages", name: "Pages", Component: PageAdmin },
    { path: "/admin/posts", name: "Posts", Component: PostAdmin },
    { path: "/admin/projects", name: "Projects", Component: ProjectAdmin },
    { path: "/admin/images", name: "Images", Component: ImageAdmin },
  ];

  const clickButtonOfClass = (targetClass: string) => {
    let target = document.getElementsByClassName(targetClass)[0] as HTMLElement;
    target !== undefined && target.click();
  };

  // checks for ctrl-alt-key, taking the key as a string and the event object.
  const ctrlAlt = (key: string, e: any) => 
    e.key.toLowerCase() === key.toLowerCase() && e.ctrlKey && e.altKey;

  const ctrl = (key: string, e: any) => 
    e.key.toLowerCase() === key.toLowerCase() && e.ctrlKey;

  useEffect(() => {
    // I guess this is where my global keybindings live
    document.addEventListener("keydown", (e) => {
      // console.log(e.key);
      if (e.key === "Escape" && document.activeElement !== null) {
        (document.activeElement as HTMLElement).blur();
      }
      else if (ctrlAlt("n", e)) {
        
        clickButtonOfClass("admin-create-button");
      }
      else if (ctrlAlt("b", e)) {
        clickButtonOfClass("admin-back-button");
      }
      else if (ctrl("`", e)) {
        clickButtonOfClass("home-link");
      }      
      else if (ctrl("1", e)) {
        clickButtonOfClass("pages-link");
      }      
      else if (ctrl("2", e)) {
        clickButtonOfClass("posts-link");
      }      
      else if (ctrl("3", e)) {
        clickButtonOfClass("projects-link");
      }
      else if (ctrl("4", e)) {
        clickButtonOfClass("images-link");
      }
    });
  }, []);

  const setBorderIfNeeded = (newClassName: string) => 
    topBorderClass !== newClassName && setTopBorderClass(newClassName);

  return(
    <div className="admin-panel">
      {
        // kinda ugly, but also kinda short for a component?
      }
      <div className={`admin-top-border${topBorderClass === "" ? "" : ` ${topBorderClass}-border`}`}>
      </div>

      <AdminSideBar 
        adminRoutes={adminRoutes}
        borderChangeCallback={setBorderIfNeeded}
        fetchAllData={fetchAllData}
      />

      <div className={`admin-panel-content-wrapper`}>
        {
          adminRoutes.map(({ path, name, Component}) => (
            <Route key={path} path={path}>
              {({ match }) => (
                <CSSTransition 
                  in={match !== null}
                  timeout={250}
                  classNames="admin-page"
                  unmountOnExit
                >
                  <Component
                    borderChangeCallback={setBorderIfNeeded}
                  />
                </CSSTransition>
              )}
            </Route>
          ))
        }

        <Route path="/admin" exact={true}>
          {
            //setBorderIfNeeded("")
          }
          {
            !pagesLoaded && !postsLoaded && !projectsLoaded && !imagesLoaded ? 
            ( <AdminLoading destination="dashboard"/> ) :
            ( // insert CSSTransition code here
              <div className="admin-dashboard">
                <AdminCard
                  modelCount={pagesSize}
                  modelName="Page"
                  modelRoute="/admin/pages"
                />
                                
                <AdminCard
                  modelCount={postsSize}
                  modelName="Post"
                  modelRoute="/admin/posts"
                />
                                
                <AdminCard
                  modelCount={projectsSize}
                  modelName="Project"
                  modelRoute="/admin/projects"
                />

                <AdminCard
                  modelCount={imagesSize}
                  modelName="Image"
                  modelRoute="/admin/images"
                />
              </div>
            ) // end CSS Transition code here
          }
        </Route>
      </div>
    </div>
  );
};

export default Admin;