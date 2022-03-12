import { FC, useEffect, useRef, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import { AdminFormRouteParams, AdminImageFormProps } from '../PropInterfaces';
// maybe no tags for now?
// import { Image, Tag } from '../Types';
import { Image } from '../Types';

import AdminFormControls from "./common/AdminFormControls";
import AdminInputText from "./common/AdminInputText";
// import AdminTagContainer from "./common/AdminTagContainer";
import AdminLoading from "./common/AdminLoading";

import { bindFormSubmissionHotkey, checkEmptyRequirement, fetchData, notNullOrUndefined, 
  parseBooleanFromDb, parseStringFromDb, postData }
  from "../common/Helpers";

const ImageForm: FC<AdminImageFormProps> = ({ backCallback, initialData }) => {
  let history     = useHistory();
  let { editId }  = useParams<AdminFormRouteParams>();

  const initialRef = useRef<Image>({
    description: "",
    name: "",
    
  });

  const assembleStateAsImage = () => ({
    //... and here?
  });

  const currentStateResemblesInitialRef = () => {
    let image = assembleStateAsImage();

    // return the chained boolean checks like in PostForm.tsx

    // temporary return to prevent the error in the useEffect
    return false;
  }

  const noUnsavedChanges = () => currentStateResemblesInitialRef();
  
  useEffect(() => {
    bindFormSubmissionHotkey();

    if (editId !== undefined) {
      let parsedId = parseInt(editId);

      if (!isNaN(parsedId)) {
        fetchData(`/images/id/${parsedId}`, () => {}, (data: Image[]) => {

          // here we'd do another fetch on the tags, whatever they look like for Image

          let parsedData = data[0];

          // parse each of the data fields useing parseXFromDb functions

          initialRef.current = parsedData;
          
          // set state
        });
      }
    }
  })
  /*
    Gonna need to return and brainstorm here - this will be a nice review.

    - review how PostForm.tsx works to get reacquainted with what I had in mind
    - figure out which inputs I need
    - Figure out what the form is going to look like
      - How do I submit a file again?
    - IN BACKEND: make sure the server receives an image and stores it on disk
    - After this, make sure 

  */

  // Component State
  const [ emptyRequirement, setEmptyRequirement ] = useState(false);
  const [ isLoaded, setIsLoaded ]                 = useState(false);
  const [ submitted, setSubmitted ]               = useState(false);
  const [ verb, ]                                 = useState(editId !== undefined && editId.length > 0 ?
    "Edit" : "Create");

  // TODO:
  // State of the Model this component is Managing

  // Ensure data has been loaded
  useEffect(() => {
    if (!isLoaded && currentStateResemblesInitialRef()) {
      setIsLoaded(true);
    }
  });

  const handleSubmission = () => {
    let data: Image     = assembleStateAsImage();
    // data["primary_key"] = id;

    // TODO: FINISH THIS
  }
  
  const onSubmitCallback = (e: any) => {
    e.preventDefault();

    // if (!submitted) {
    //   if (validate)
    // }
  }

  // TEMP - what constitutes a valid submission of this form?
  const validateSubmission = () => true;

  const checkRequirement = (field: string) =>
    checkEmptyRequirement(emptyRequirement, field);

  return (
    <div>Hey, I'm a placeholder!</div>
  );
};

export default ImageForm;