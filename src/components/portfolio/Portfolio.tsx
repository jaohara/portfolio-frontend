import { FC, useEffect, useState } from 'react';
import { Route, useLocation } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

import NoMatchesMessage from '../common/NoMatchesMessage';
import Project from './Project';
import ProjectCard from './ProjectCard';

import { PageProps } from '../PropInterfaces';

import routes from '../common/Routes'


const Portfolio: FC<PageProps> = 
({ filter, inModelView, pagePath, projectTechnologies, projectTechnologiesLoaded, projects, 
  projectsLoaded, setFilter, setInModelView }) => {

  const viewingModel = !routes.map(r => r.path).includes(useLocation().pathname);

  const propsLoaded = projectsLoaded && projectTechnologiesLoaded;

  // this should be more refined -> NoMatchesMessage should have a 
  // variation for no entries rather than no matches
  const noProjects = projects === undefined || projects.length === 0;

  const getProjectTechsFromId = (id: number) => projectTechnologies?.filter(tech => tech.id === id);

  useEffect(() => { setInModelView !== undefined && setInModelView(viewingModel) });  

  return(
    noProjects ? 
    (<NoMatchesMessage modelName="project" />) :
    <div className="portfolio-page page-content-wrapper">
      {
        propsLoaded && 
        (<Route
            key={`project-cards`}
            exact
            path={pagePath}
            children={({ match }) => (
              <CSSTransition
                classNames="model"
                key={`project-cards`}
                timeout={300}
                in={match !== null}
                unmountOnExit
              >
                <div className="project-cards-wrapper">
                  { projects!.map((project: any) => (
                    <ProjectCard 
                      {...project}
                      filter={filter} 
                      key={`project-card-${project.id}`} 
                      projectRoute={`${pagePath}/${project.id}`}
                      technologies={getProjectTechsFromId(project.id)} 
                      setFilter={setFilter}
                    />

                  ))}
                </div>
              </CSSTransition>
            )}
          />)
        }

        {
          propsLoaded &&
          projects!.map((project: any) => (
            <Route
              key={`project-route-${project.id}`}
              exact
              path={`${pagePath}/${project.id}`}
              children={({ match }) => (
                <CSSTransition
                  classNames="model"
                  key={`project-${project.id}`}
                  timeout={1000}
                  in={match !== null} 
                  onEntering={ () => window.scroll(0,0) }
                  unmountOnExit
                >
                  <Project 
                    body={project.description}
                    date={project.modified}
                    filter={filter}
                    key={`project-${project.id}`}
                    projectId={project.id}
                    setFilter={setFilter}
                    title={project.title}
                    technologies={getProjectTechsFromId(project.id)}
                  />
                </CSSTransition>
            )}/>
          ))
        }
    </div>
  );
}

/*


*/

export default Portfolio;