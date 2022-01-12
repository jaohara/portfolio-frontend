import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';

import ModelTagContainer from '../common/ModelTagContainer';
import PrettyDate from '../common/PrettyDate';

import { ProjectCardProps } from '../PropInterfaces';

const ProjectCard: FC<ProjectCardProps> = 
({ filter, title, modified, description, image_url, projectRoute, setFilter, technologies, techsFilter}) => {
  const history = useHistory();

  const navigateToProject = (e: React.MouseEvent) => 
    projectRoute !== undefined && history.push(projectRoute);
  
  return(
    <div 
      className="project-card entry-stub"
      onClick={(e) => navigateToProject(e)}
    >
      <div className="project-card-content">
        <h1>{ title }</h1>
        
        <div className="project-card-meta model-meta">             
          <ModelTagContainer
            filter={filter}
            model="Project"
            setFilter={setFilter}
            tags={technologies}
          />

          <PrettyDate date={modified} verb="modified" />

          <div className="project-card-meta-description">
            { description.split("\n")[0] }
          </div>
        </div>
      </div>
      
      
      <div className="project-card-image-wrapper">
        <img src={image_url} alt={`${title} Screenshot`} />
      </div>
    </div>
  );
}

export default ProjectCard;