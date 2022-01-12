import { FC, useEffect, useRef, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import { AiFillTags } from "react-icons/ai";

import { AdminFormRouteParams, AdminPostFormProps, AdminTagProps } from '../PropInterfaces';
import { Post, Tag } from '../Types';

import AdminEditor from "./common/AdminEditor";
import AdminFormControls from "./common/AdminFormControls";
import AdminInputCheckBox from "./common/AdminInputCheckBox";
import AdminInputText from "./common/AdminInputText";
import AdminTagContainer from "./common/AdminTagContainer";
import AdminLoading from "./common/AdminLoading";

import { bindFormSubmissionHotkey, checkEmptyRequirement, fetchData, notNullOrUndefined, 
  parseBooleanFromDb, parseStringFromDb, postData }
  from "../common/Helpers";

const PostForm: FC<AdminPostFormProps> = ({ backCallback, initialData }) => {
  let history     = useHistory();
  let { editId }  = useParams<AdminFormRouteParams>();

  const initialRef = useRef<Post>({
    body: "",
    hidden: true,
    title: "",
  });

  const assembleStateAsPost = () => ({
    body: body,
    hidden: hidden,
    title: title,
  });

  const currentStateResemblesInitialRef = () => {
    let post = assembleStateAsPost();

    // console.log("Assembled Post - initialRef");
    // console.log(`${post.} - ${initialRef.current}`);

    return  post.body   === initialRef.current.body &&
            post.hidden === initialRef.current.hidden &&
            post.title  === initialRef.current.title;
  };

  const noUnsavedChanges = () => currentStateResemblesInitialRef();

  useEffect(() => {
    bindFormSubmissionHotkey();

    if (editId !== undefined) {
      let parsedId = parseInt(editId);

      if (!isNaN(parsedId)) {
        fetchData(`/posts/id/${parsedId}`, () => {}, (data: Post[]) => {
          if (notNullOrUndefined(data[0])) {

            fetchData(`/posts/categories/id/${parsedId}`, () => {}, (cats: Tag[]) => {
              let parsedCategories: AdminTagProps[] = [];

              cats.forEach(tag => parsedCategories.push({
                model: "Post",
                modelId: parsedId,
                name: tag.name,
              }));

              setCategories(parsedCategories);
            });

            let parsedData = data[0];

            parsedData.body    = parseStringFromDb(parsedData.body);
            parsedData.hidden  = parseBooleanFromDb(parsedData.hidden);
            parsedData.title   = parseStringFromDb(parsedData.title);

            initialRef.current = parsedData;

            setBody(initialRef.current.body!);
            setHiddenToggle(parseBooleanFromDb(initialRef.current.hidden));
            setTitle(initialRef.current.title!);
            notNullOrUndefined(initialRef.current.id) && setId(initialRef.current.id!);
          }
        }, () => console.log("Error fetching Post Data."));
      }
    }
  }, []);


  /*

    TODO: Resume here

    - Categories aren't working

  */

  // Component State
  const [ emptyRequirement, setEmptyRequirement ] = useState(false);
  const [ isLoaded, setIsLoaded ]                 = useState(false);
  const [ submitted, setSubmitted ]               = useState(false);
  const [ verb, ]                                 = useState(editId !== undefined && editId.length > 0 ?
    "Edit" : "Create");


  // State of the Model this Component is Managing
  const [ body, setBody ]                         = useState(initialRef.current.body as string);
  const [ categories, setCategories ]             = useState<AdminTagProps[]>();
  const [ id, setId ]                             = useState<number>();
  const [ hidden, setHiddenToggle ]               = useState(Boolean(initialRef.current.hidden));
  const [ title, setTitle ]                       = useState(initialRef.current.title as string);

  // Ensure data has been loaded
  useEffect(() => {
    if (!isLoaded && currentStateResemblesInitialRef()) {
      setIsLoaded(true);
    }
  });

  // TODO: Flesh this out to add in Categories - also look into why Categories aren't
  // being created for existing posts
  const handleSubmission = () => {
    // let data: Post = {
      //   body: body,
      //   hidden: hidden, 
      //   primary_key: id,
      //   title: title,
      // };
      
    let data: Post      = assembleStateAsPost();
    data["primary_key"] = id;

    let route = verb === "Create" ? "/posts/create" : "/projects/update";

    //@ts-ignore
    postData(route, data, id => {
      if (verb === "Create" && id !== undefined) {
        let catString = "";

        categories?.forEach(cat => catString += `${cat.name},`);

        catString = catString.substring(0, catString.length - 1);

        let catData = {
          categories: catString,
          post_id: id,
        };

        postData("/posts/categories/create/batch", catData);
      }
    });

    // postData(route, data);
  }

  const onSubmitCallback = (e: any) => {
    // seeing as these are all the same names... could this just be imported?
    e.preventDefault();

    if (!submitted) {
      if (validateSubmission()) {
        handleSubmission();
        setSubmitted(!submitted);
        backCallback();
        history.push("/admin/posts");
      }
      else {
        setEmptyRequirement(true);
      }
    }
  }

  const validateSubmission = () => title.length > 0;

  const checkRequirement = (field: string) => 
    checkEmptyRequirement(emptyRequirement, field);

  return (
    !isLoaded ?
    (<AdminLoading destination="post" />) :
    (<div className="admin-post-form">

      <AdminFormControls
        backCallback={backCallback}
        checkCallback={noUnsavedChanges}
        destination="/admin/posts"
        emptyRequirement={emptyRequirement && !validateSubmission()}
        model="Post"
        submitCallback={onSubmitCallback}
        verb={verb}
      />

      <form id="post-form" className="admin-form" onSubmit={onSubmitCallback}>
        <AdminInputText 
          emptyRequirement={checkRequirement(title)}
          id="post-title"
          label="Post Title"
          onChange={(e) => setTitle(e.target.value)}
          setValue={setTitle}
          value={title}
        />

        <p>
          <label className="centered-content-with-icon left-margin admin-tag-label">
            Post Categories
            <AiFillTags />
          </label>
          <AdminTagContainer
            model="Post"
            modelId={id}
            tagSet={categories}
            setTagSet={setCategories}
          />
        </p>

        <AdminInputCheckBox
            id="toggle-published"
            label="Published?"
            noMargin={true}
            onChange={setHiddenToggle}
            value={!hidden}
        />

        <p>
          <AdminEditor
            label="Post Body"
            name="post-body"
            onChange={setBody}
            placeholder="Write post content here"
            value={body}
          />
        </p>

      </form>
    </div>)
  );
};

export default PostForm;