import { FC, useEffect, useRef, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import { DiTerminal } from "react-icons/di";

import { AdminFormRouteParams, AdminProjectFormProps, AdminTagProps } from '../PropInterfaces';
import { Project, Tag } from '../Types';

import AdminEditor from './common/AdminEditor';
import AdminFormControls from "./common/AdminFormControls";
import AdminInputCheckBox from "./common/AdminInputCheckBox";
import AdminInputText from "./common/AdminInputText";
import AdminLoading from "./common/AdminLoading";
import AdminTagContainer from './common/AdminTagContainer';

import { bindFormSubmissionHotkey, checkEmptyRequirement, fetchData, notNullOrUndefined, 
  parseBooleanFromDb, parseStringFromDb, postData, printEmptyRequirementClass } 
  from "../common/Helpers";

const ProjectForm: FC<AdminProjectFormProps> = ({ backCallback, initialData }) => {
  let history           = useHistory();
  let { editId }        = useParams<AdminFormRouteParams>();
  
  const initialRef = useRef<Project>({
    deployed_url: initialData.deployed_url,
    description: initialData.description,
    github_url: initialData.github_url,
    is_scrap: initialData.is_scrap,
    title: initialData.title,
  });

  // Create a Project Model object from the current state of the model
  const assembleStateAsProject = () => ({
    deployed_url: deployedUrl,
    description: description,
    github_url: githubUrl,
    is_scrap: snippetToggle,
    title: title, 
  });

  // used to check for unsaved changes
  const currentStateResemblesInitialRef = () => {
    let project = assembleStateAsProject();

    // console.log("initialRef and Project:");
    // console.log(initialRef.current);
    // console.log(project);

    return  project.deployed_url === initialRef.current.deployed_url &&
            project.description  === initialRef.current.description &&
            project.github_url   === initialRef.current.github_url &&
            project.is_scrap     === initialRef.current.is_scrap &&
            project.title        === initialRef.current.title;
  };

  const noUnsavedChanges = () =>  currentStateResemblesInitialRef();

  // Initial Load Effect
  useEffect(() => {
    bindFormSubmissionHotkey();
    
    if (editId !== undefined) {
      let parsedId = parseInt(editId);

      if (!isNaN(parsedId)) {
        fetchData(`/projects/id/${parsedId}`, () => {}, (data: Project[]) => {
          // Parse data into initialRef if it exists
          if (notNullOrUndefined(data[0])){

            // fetch ProjectTechnologies
            fetchData(`/projects/technologies/id/${parsedId}`, () => {}, (techs: Tag[]) => {
              let parsedTechnologies: AdminTagProps[] = [];

              techs.forEach(tag => parsedTechnologies.push({ 
                model: "Project",
                modelId: parsedId,
                name: tag.name,
              }));

              setTechnologies(parsedTechnologies);
            })

            let parsedData = data[0];

            parsedData.deployed_url = parseStringFromDb(parsedData.deployed_url);
            parsedData.description  = parseStringFromDb(parsedData.description);
            parsedData.github_url   = parseStringFromDb(parsedData.github_url);
            parsedData.is_scrap     = parseBooleanFromDb(parsedData.is_scrap);
            parsedData.title        = parseStringFromDb(parsedData.title);

            initialRef.current = parsedData;
            
            // assign initial values
            setDeployedUrl(initialRef.current.deployed_url!);
            setDescription(initialRef.current.description!);
            setGithubUrl(initialRef.current.github_url!);
            setSnippetToggle(parseBooleanFromDb(initialRef.current.is_scrap));
            setTitle(initialRef.current.title!);
            notNullOrUndefined(initialRef.current.id) && setId(initialRef.current.id!);
            
          }          
        },  () => console.log("Error fetching Project Data."));
      }
    }
  }, []);

  // Component State
  const [ emptyRequirement, setEmptyRequirement ] = useState(false);
  const [ isLoaded, setIsLoaded ]                 = useState(false);
  const [ submitted, setSubmitted ]               = useState(false);
  const [ verb, ]                                 = useState(editId !== undefined && editId.length > 0 ? 
    "Edit" : "Create");

  // State of the Model this Component is Managing  
  const [ deployedUrl, setDeployedUrl ]           = useState(initialRef.current.deployed_url as string);
  const [ description, setDescription ]           = useState(initialRef.current.description as string);
  const [ githubUrl, setGithubUrl ]               = useState(initialRef.current.github_url as string);
  const [ id, setId ]                             = useState<number>();
  const [ snippetToggle, setSnippetToggle ]       = useState(Boolean(initialRef.current.is_scrap));
  const [ technologies, setTechnologies ]         = useState<AdminTagProps[]>();
  const [ title, setTitle ]                       = useState(initialRef.current.title as string);     
  
  // Ensure data has been loaded 
  useEffect(() => {
    if (!isLoaded && currentStateResemblesInitialRef()) {
      setIsLoaded(true);
    }
  });
  
  // Handles form submission, directing to the create or update route based on form verb
  const handleSubmission = () => {
    let data: Project   = assembleStateAsProject();
    data["primary_key"] = id;

    let route = verb === "Create" ? "/projects/create" : "/projects/update";

    // postData(route, data, response => console.log(response));
    //@ts-ignore
    postData(route, data, id => {
      if (verb === "Create" && id !== undefined) {
        let techString = "";

        technologies?.forEach(tech => techString += `${tech.name},`);

        // remove trailing comma
        techString = techString.substring(0, techString.length - 1);

        let techData = {
          technologies: techString,
          project_id: id,
        }
        
        postData("/projects/technologies/create/batch", techData);
      }
    });
  };

  // Callback for Form Submission
  const onSubmitCallback = (e: any) => {
    e.preventDefault();

    if (!submitted) { 
      if (validateSubmission()){
        handleSubmission();
        setSubmitted(!submitted);
        backCallback();
        history.push("/admin/projects");
      }
      else {
        setEmptyRequirement(true);
      }
    }
  };

  const validateSubmission = () => notNullOrUndefined(title) && notNullOrUndefined(description) && 
    title.length > 0 && description.length > 0;

  const printEmptyRequirement = (field: string) => 
    printEmptyRequirementClass(emptyRequirement, field);

  const checkRequirement = (field: string) =>
    checkEmptyRequirement(emptyRequirement, field);

  return (
    !isLoaded ? 
    (<AdminLoading destination="project" />) :
    (<div className="admin-project-form">

      <AdminFormControls
        backCallback={backCallback}
        checkCallback={noUnsavedChanges}
        destination="/admin/projects"
        emptyRequirement={emptyRequirement && !validateSubmission()}
        model="Project"
        submitCallback={onSubmitCallback}
        verb={verb}
      />

      <form id="project-form" className="admin-form" onSubmit={onSubmitCallback}>

        {
          !submitted &&
        (<>

        <AdminInputText 
          emptyRequirement={checkRequirement(title)}
          id="project-title"
          label="Project Title"
          onChange={(e) => setTitle(e.target.value)}
          setValue={setTitle}
          value={title}
        />

        <AdminInputText
          id="project-github-url"
          label="Github URL"
          onChange={(e) => setGithubUrl(e.target.value)}
          special="github"
          setValue={setGithubUrl}
          value={githubUrl}
        />

        <AdminInputText 
          id="project-deployed-url"
          label="Deployed URL"
          onChange={(e) => setDeployedUrl(e.target.value)}
          special="url"
          setValue={setDeployedUrl}
          value={deployedUrl}
        />

        <AdminInputCheckBox
          id="toggle-scrap"
          label="Is this Project visible?"
          noMargin={true}
          onChange={setSnippetToggle}
          value={!snippetToggle}
        />

        <p>
          <label className="centered-content-with-icon left-margin admin-tag-label">
            Project Technologies 
            <DiTerminal />
          </label>
          <AdminTagContainer
            model="Project"
            modelId={id}
            tagSet={technologies}
            setTagSet={setTechnologies}
          />
        </p>
        
        <p>
          <AdminEditor
            className={`${printEmptyRequirement(description)}`}
            emptyRequirement={printEmptyRequirement(description) !== ""}
            label="Project Description"
            name="project-description"
            onChange={setDescription}
            placeholder="Write project description here"
            value={description}
          />
        </p></>)}
      </form>
    </div>)
  );
};

export default ProjectForm;