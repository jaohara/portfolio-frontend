import { FC, useEffect, useRef, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import { AdminPageFormProps, AdminFormRouteParams } from '../PropInterfaces';
import { Page } from "../Types";

import AdminEditor from "./common/AdminEditor";
import AdminFormControls from "./common/AdminFormControls";
import AdminInputCheckBox from "./common/AdminInputCheckBox";
import AdminInputText from "./common/AdminInputText";
import AdminLoading from "./common/AdminLoading";

import { bindFormSubmissionHotkey, checkEmptyRequirement, fetchData, 
  notNullOrUndefined, parseBooleanFromDb, parseStringFromDb, postData } from "../common/Helpers";

const PageForm: FC<AdminPageFormProps> = ({ backCallback, initialData }) => {
  let history             = useHistory();
  let { editName }        = useParams<AdminFormRouteParams>();

  const initialRef = useRef<Page>({
    body: initialData.body,
    hidden: initialData.hidden,
    name: initialData.name,
    pretty_name: initialData.pretty_name,
  });

  // more code reuse here, is this as simple as it can be?
  const assembleStateAsPage = () => ({
    body: body,
    hidden: hiddenToggle,
    name: name,
    pretty_name: prettyName,
  });

  const currentStateResemblesInitialRef = () => {
    let page = assembleStateAsPage();

    return  page.body         === initialRef.current.body &&
            page.hidden       === initialRef.current.hidden &&
            page.name         === initialRef.current.name &&
            page.pretty_name  === initialRef.current.pretty_name
  };

  const noUnsavedChanges = () => currentStateResemblesInitialRef();

  useEffect(() => { 
    bindFormSubmissionHotkey();

    if (editName !== undefined) {
      fetchData(`/pages/${editName}`, () => {}, (data: Page[]) => {
        if (notNullOrUndefined(data[0])){
          let parsedData = data[0];

          // I do this in all of the models and think it could probably be done smarter
          parsedData.body         = parseStringFromDb(parsedData.body);
          parsedData.hidden       = parseBooleanFromDb(parsedData.hidden);
          parsedData.name         = parseStringFromDb(parsedData.name);
          parsedData.pretty_name  = parseStringFromDb(parsedData.pretty_name);

          initialRef.current = parsedData;

          setBody(initialRef.current.body!);
          setHiddenToggle(parseBooleanFromDb(initialRef.current.hidden!));
          setName(initialRef.current.name!);
          setPrettyName(initialRef.current.pretty_name!);
        }
        // TODO: report errors in the UI.
      }, () => console.log("Error fetching Page Data."))
    }
  }, []);

  // Component State
  const [ emptyRequirement, setEmptyRequirement ] = useState(false);
  const [ isLoaded, setIsLoaded ]                 = useState(false);
  const [ submitted, setSubmitted ]               = useState(false);
  const [ verb, ]                                 = useState(editName !== undefined && editName.length > 0 ? 
    "Edit" : "Create");  
 
  
  // State of the Model this Component is Managing
  const [ body, setBody ]                         = useState(initialRef.current.body as string);
  const [ hiddenToggle, setHiddenToggle ]         = useState(Boolean(initialRef.current.hidden));
  const [ name, setName ]                         = useState(initialRef.current.name as string);
  const [ prettyName, setPrettyName ]             = useState(initialRef.current.pretty_name as string);
  
  // TODO: Code reuse
  useEffect(() => {
    if (!isLoaded && currentStateResemblesInitialRef()) {
      setIsLoaded(true);
    }
  });

  const handleSubmission = () => {
    let data: Page = assembleStateAsPage();

    /*
      Have to account for some nonsense here - in the request to the backend,
      "name" is assumed to be "prettyName", with all of the unsafe characters
      and spacing. The backend creates a safe name that it saves in the database
      from this submitted name, which is then saves as "pretty_name". 
    */
    data.name        = prettyName;
    data.primary_key = name;

    let route = verb === "Create" ? "/pages/create" : "/pages/update";

    postData(route, data);
  };

  
  const onSubmitCallback = (e: any) => {
    e.preventDefault();
    
    if (!submitted) {
      if (validateSubmission()) {
        handleSubmission();
        setSubmitted(!submitted);
        backCallback();
        history.push("/admin/pages");
      }
      else { 
        setEmptyRequirement(true);
      }
    }
  };

  const validateSubmission = () => notNullOrUndefined(prettyName) && prettyName.length > 0;

  const checkRequirement = (field: string) => 
    checkEmptyRequirement(emptyRequirement, field);

  return (
    !isLoaded ?
    (<AdminLoading destination="page" />) :
    (<div className="admin-page-form admin-form-wrapper">
      {
        // TODO:  What is ".admin-form-wrapper" used for above?
      }

      <AdminFormControls
        backCallback={backCallback}
        checkCallback={noUnsavedChanges}
        destination="/admin/pages"
        emptyRequirement={emptyRequirement && !validateSubmission()}
        model="Page"
        submitCallback={onSubmitCallback}
        verb={verb}
      />

      <form id="page-form" className="admin-form" onSubmit={onSubmitCallback}>

        <AdminInputText
          emptyRequirement={checkRequirement(prettyName)}
          id="page-name"
          label="Page Name"
          onChange={(e) => setPrettyName(e.target.value)}
          value={prettyName}
        />

        <AdminInputCheckBox
          defaultValue={hiddenToggle}
          id="toggle-hidden"
          label="Hidden?"
          noMargin={true}
          onChange={setHiddenToggle}
          value={hiddenToggle}
        />

        <p>
          <AdminEditor
            label="Page Body"
            name="page-body"
            onChange={setBody}
            placeholder="Write page content here!"
            value={body}
          />
        </p>

      </form>
    </div>)
  );
};

export default PageForm;