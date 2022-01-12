import { FC, useState, useEffect } from "react";
import { Link, Route, Switch, useParams } from "react-router-dom";

import JsxParser from "react-jsx-parser";

import { AdminFormRouteParams, ModelAdminProps } from "../PropInterfaces";
import { Project } from "../Types";

import { fetchData, highlightSearchTerms, notNullOrUndefined, unbindFormSubmissionHotkey } 
  from "../common/Helpers";

import AdminControls from './common/AdminControls';
import AdminDataLength from "./common/AdminDataLength";
import AdminTableDeleteCell from "./common/AdminTableDeleteCell";
import AdminTableTooltipCell from "./common/AdminTableTooltipCell";
import AdminTableVisibleCell from "./common/AdminTableVisibleCell";
import AdminLoading from "./common/AdminLoading";

import ProjectForm from "./ProjectForm";

const ProjectAdmin: FC<ModelAdminProps> = ({ borderChangeCallback }) => {
  // const [ error, setError ]         = useState(null);
  const [ , setError ]              = useState(null);
  const [ filter, setFilter ]       = useState("");
  const [ isLoaded, setIsLoaded ]   = useState(false);
  const [ projects, setProjects ]   = useState([]);

  let { editId } = useParams<AdminFormRouteParams>();

  useEffect(() => {
    unbindFormSubmissionHotkey();
    borderChangeCallback !== undefined && borderChangeCallback("project");
    fetchProjects();
  }, []);

  const fetchProjects = () => fetchData("/projects/all", setIsLoaded, setProjects, setError);

  const createEmptyProject = () => ({
    deployed_url: "",
    description: "",
    github_url: "",
    is_scrap: false,
    title: "",
  } as Project);

  const getProjectIfExists = () => {
    let result = createEmptyProject();

    if (notNullOrUndefined(projects)) {
      let filterResult = projects.filter((project: Project) => project.id === editId);

      result = filterResult.length > 0 ? filterResult[0] : result;
    }

    return result;
  };

  return (
    <div className="admin-panel-projects">
      {
        !isLoaded ? <AdminLoading destination="project"/> : (
          <Switch>
            <Route path="/admin/projects/create">
              <ProjectForm 
                backCallback={fetchProjects}
                initialData={createEmptyProject() as Project}
              />
            </Route>

            <Route path="/admin/projects/edit/:editId">
              <ProjectForm
                backCallback={fetchProjects}
                initialData={getProjectIfExists() as Project}
              />
            </Route>

            <Route exact={true} path="/admin/projects">
              <AdminControls 
                filterOnChange={setFilter}
                filterValue={filter}
                modelName="Project"
              />

              {
                projects.length > 0 ? (
                <div className="admin-table-wrapper">
                  <AdminDataLength
                    dataLength={projects.length}
                    modelName="Project"
                  />

                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>
                          ID
                        </th>
                        <th>
                          Title
                        </th>
                        <AdminTableTooltipCell
                          cellContent="Visible?"
                          tooltipText="Whether or not this Project is in progress and unpublished."
                        />
                        <AdminTableTooltipCell
                          cellContent="Delete?"
                          tooltipText="Permanently deletes the given Project."
                        />
                      </tr>
                    </thead>

                    <tbody>
                      {
                        projects.map((project: any) => (
                          (filter.length === 0 || 
                            project.title.toLowerCase().match(filter.toLowerCase()) !== null) && ( 
                          <tr key={project.id}>
                            <td>
                              {project.id}
                            </td>
                            <td>
                              <Link
                                className="admin-table-edit-link" 
                                to={`/admin/projects/edit/${project.id}`}
                              >
                                {
                                  filter.length === 0 ? project.title :
                                  (
                                    <JsxParser 
                                      jsx={highlightSearchTerms(project.title, filter)}
                                    />
                                  )
                                }
                              </Link>
                            </td>

                            <AdminTableVisibleCell
                              initialVisibility={!project.is_scrap}
                              invertedModel={true}
                              primaryKey={project.id}
                              toggleKey="is_scrap"
                              toggleRoute="/projects/update"
                            />

                            <AdminTableDeleteCell
                              deletionKey="id"
                              deletionRoute="/projects/delete"
                              deletionValue={project.id}
                              successCallback={fetchProjects}
                            />
                          </tr>
                        )))
                      }
                    </tbody>
                  </table> 
                </div>) : (
                <p>
                  There are no Projects saved.
                </p>)
              }
            </Route>
          </Switch>
        )
      }
      
    </div>
  );
};

export default ProjectAdmin;