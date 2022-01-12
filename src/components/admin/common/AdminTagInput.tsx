import { FC, useState, useEffect } from "react";

import { AdminTagInputProps, AdminTagProps } from "../../PropInterfaces";

import { escapeRegex, notNullOrUndefined, postData } from "../../common/Helpers";

const AdminTagInput: FC<AdminTagInputProps> = ({ allTags, currentTag, model, modelId, tagSet, 
  refreshAllTags, setCurrentTag, setTagSet, setVisible, visible }) => {
  const [ inputHasFocus, setInputHasFocus ] = useState(false);
  const [ matchComplete, setMatchComplete ] = useState("");
  const [ tagMatch, setTagMatch ]           = useState("");

  /*
    Alright, you want to resume here.

    You've got a weird bug with certain non-matches - if the first letter isn't
    the first letter of any of the testTags, it matches C++, the first tag alphabetically.

    You're also getting a weird bug where H->HTML and HO->HTML, but I can't find other
    incorrect letters that match this. Is there something about the match not being updated?
    In this scenario, autocompleting with tab will clear the tag value.


    TODO: Handling ProjectTechnology Creation

    In the case of the edit view, this is trivial - insert a ProjectTechnology with the
    existing ID and the specified Technology name. However, if the Project entry doesn't
    yet exist in the database (creating a new one), I won't be able to insert them in this
    manner.

    I think the solution will be to amass a collection of the desired tags in the event
    that the Project doesn't yet exist.

    When I create an entry in the database, the JSON that the server responds with includes
    an entry for `insertId`. I will use this go to through the list of ProjectTechnologies, 
    first creating technologies if they don't exist, then creating the ProjectTechnology entries
    with the given insertId and technologyName.

    
  */

  const getBaseRoute = () => model === "Post" ? "/posts/categories/" : "/projects/technologies/";

  const hasMatch = () => currentTag !== undefined && allTags !== undefined &&
    allTags.filter((m) => m.name.toLowerCase().includes(currentTag.toLowerCase())).length > 0;

  // the tag is already equal to the best match
  const tagCompletesMatch = () => notNullOrUndefined(currentTag) && notNullOrUndefined(tagMatch) 
    && currentTag.toLowerCase() === tagMatch.toLowerCase();

  const tagDoesNotAlreadyExist = (tagName: string) => tagSet !== undefined && 
    tagSet.filter(tag => tag.name.toLowerCase() === tagName.toLowerCase()).length === 0;
  
  const deleteLastTag = () => {
    if (notNullOrUndefined(tagSet) && notNullOrUndefined(setTagSet) && tagSet!.length > 0) {
      if (modelId !== undefined) {
        let deleteTargetName = tagSet![tagSet!.length-1].name;
        let route = getBaseRoute() + "delete";

        let data = {
          category_name: deleteTargetName,
          post_id: modelId,
          project_id: modelId,
          technology_name: deleteTargetName,
        };

        postData(route, data);
      }

      setTagSet!(tagSet!.slice(0,tagSet!.length - 1));
    }
  };

  const resetTagState = () => {
    setCurrentTag("");
    setTagMatch("");
    setMatchComplete("");
  };

  // shorthand for that strange hacky thing
  const focusInput = () => {
    let input = document.getElementById("admin-tag-input");
    window.setTimeout(() => input?.focus(), 0);
  };

  const blurInput = () => {
    setInputHasFocus(false);
    setVisible(false);  // TODO: Comment this to prevent hiding on focus loss
    setCurrentTag("");
  };

  const addTag = () => {
    if (modelId !== undefined) {
      // let route = (model === "Post" ? "/posts/categories/" : "/projects/technologies/") + "create";
      let route = getBaseRoute() + "create";
      
      let data = {
        category_name: currentTag,
        project_id: modelId,
        post_id: modelId,
        technology_name: currentTag,
      };

      // TODO: Probably should handle errors here
      postData(route, data);
      refreshAllTags();
    }
  };

  useEffect(() => {
    if (currentTag !== undefined && currentTag.length === 0) {
      tagMatch !== "" && setTagMatch("");
      matchComplete !== "" && setMatchComplete("");
    }
  });

  useEffect(() => {
    if (currentTag.length > 0 && !tagCompletesMatch() && allTags !== undefined) {
      // I need to escape my regex to not cause "C++" to crash this
      let matches = allTags.filter((m) => 
        currentTag !== undefined && m.name.toLowerCase().includes(currentTag.toLowerCase()) 
      && m.name.toLowerCase().match(escapeRegex(currentTag.toLowerCase()))?.index === 0).sort();
      
      console.log(`tag is ${currentTag}`);
      console.log(matches);
      
      setTagMatch(matches[0] !== null && matches[0] !== undefined ? matches[0].name : "");
    }
  }, [currentTag]);

  useEffect(() => {
    tagMatch !== undefined && currentTag.length !== 0 &&
    setMatchComplete(tagMatch.substring(currentTag.length, tagMatch.length))
  }, [currentTag, tagMatch]);

  /*
    I need to think of some way to handle both pressing enter and
    pressing tab. How does autocomplete generally work? 

    Does the user expect a filled a suggested autofill to be filled in
    with enter? What happens if you type "Java" v. "JavaScript"?
    Enter is probably best for submitting the tag as is, and tab is
    for submitting the autocompleted one. Or maybe just filling it 
    in and not submitting? I could test which functionality I prefer.
  */

  // I also might want to put the label here as well, so 
  // I should probably take in the model name.
  const handleAdminTagInput = (e: React.KeyboardEvent) => {
    if (e.key === "Tab" || e.key === "Enter" || (e.key === "Backspace" && e.ctrlKey)) {
      if (e.key === "Backspace" && e.ctrlKey) {
        currentTag.length === 0 && deleteLastTag();
        return;
      }
      
      if (currentTag.length === 0) {
        return;
      }

      e.preventDefault();
      console.log(`Hey, that was ${e.key}!`);

      if (e.key === "Tab" && hasMatch() && !tagCompletesMatch() && notNullOrUndefined(tagMatch)) {
        setCurrentTag(tagMatch);
        setTagMatch("")
        setMatchComplete("");
      }
      else if (e.key === "Enter") {
        if (currentTag.length !== 0) {
          let newTag: AdminTagProps = { name: currentTag };

          if (tagSet !== undefined) {
              if (tagDoesNotAlreadyExist(currentTag)) {
                //handle submission
                setTagSet !== undefined && setTagSet([...tagSet, newTag]);
                addTag();
                resetTagState();
              }
              else {
                // error! Tag is already added. How do I handle this?
                //console.log("This is the 'Tag is Already Added' part.");
              }
          }
          else if (setTagSet !== undefined) {
            setTagSet([newTag]);
            addTag();
            resetTagState();
          }
        }
        else {
          blurInput();
        }
      }
    }
  }

  return (
    <>
    <span 
      className={`admin-tag-input-wrapper ${visible ? "admin-tag-input-wrapper-active" : ""}`}
    >

      <input 
        className="admin-tag-input"
        onBlur={blurInput}
        onClick={(e) => e.preventDefault()}
        onChange={(e) => setCurrentTag(e.target.value)}
        // hacky, but causes a redraw to show the cursor
        onFocus={() => setInputHasFocus(true)}
        // This is going to check to see if "Tab" or "Enter" were the keys pressed
        onKeyDown={(e) => handleAdminTagInput(e)}
        id="admin-tag-input"
        type="text" 
        value={currentTag}
      />

      <span 
        className="admin-tag-input-styled"
        onClick={(e) => focusInput()}
      >
        <span className="admin-tag-text">{currentTag}</span>
        {
          // do I want to use window.getSelection to have the selected text
          // appear highlighted?

          inputHasFocus ?
          (
            <>
            <span className="admin-tag-cursor">|</span>
            {
              hasMatch() && currentTag.length > 0 && tagMatch !== undefined && 
              <span className="admin-tag-autocomplete">{matchComplete}</span>
            }
            </>
          ) : ""
        }
      </span>  
    </span>

      {
        // <ul className="debug-list">
        //   <li><code>currentTag</code>: {currentTag}</li>
        //   <li><code>tagMatch</code>: {tagMatch}</li>
        //   <li><code>matchComplete</code>: {matchComplete}</li>
        // </ul>
      }
    </>
  );
};

export default AdminTagInput;