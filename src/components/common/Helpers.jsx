// AdminHelpers.jsx - various helper functions for Admin Components
//  
//  It just seemed way easier to make this js to avoid typing the callbacks.

// note to self - this var implies "/api" is appended to the host url
import { baseApiUrl } from '../../environment';

// returns a boolean from the value that a boolean would have in a database
//  Maybe not as necessary? Not sure if I'm getting "false" as a string too often
export const parseBooleanFromDb = (input) => 
  input !== "false" && Boolean(input);

// returns a string (or empty string) for a value that a string would 
// have in the database
export const parseStringFromDb = (input) => 
  notNullOrUndefined(input) && typeof input === "string" ? input : "";  
 
export const notNullOrUndefined = (data) =>
  data !== undefined && data !== null;

export const fetchData = (route, loadedCallback, dataCallback, errorCallback) => {
  let apiRoute = `${baseApiUrl}${route}`;

  fetch(apiRoute)
    .then(res => res.json())
    .then(json => {
      //console.log(json);
      dataCallback(json);
      loadedCallback(true);
    },
    error => {
      errorCallback(error);
      loadedCallback(true);
    });
};

// should this just be "postData"?
export const postData = (route, data, successCallback, setError = undefined) => {
  let apiRoute = `${baseApiUrl}${route}`;

  let requestOptions = {
    body: new URLSearchParams(data),
    method: 'POST',
  };

  // TODO: Finalize what these do? better success and error callback handling?
  //  maybe I should pass the "goBack()" or whatever function I use in my 
  //  Form components in here?
  fetch(apiRoute, requestOptions)
    .then(res => res.json())
    .then(json => {
      successCallback !== undefined && successCallback(json.insertId);
      console.log("postData Success!");
      console.log(requestOptions);
    },
    (error) => {
      console.log("postData Failure?");
      console.log(error);
    });
};


// Looks for a button#form-submission on a page and clicks it if it exists
const formSubmissionListener = (e) => {
  if (e.key === "Enter" && e.ctrlKey) {
    unbindFormSubmissionHotkey();

    let formSubmissionButton = document.getElementById("form-submission");
    
    notNullOrUndefined(formSubmissionButton) && formSubmissionButton.click();
  }
}
export const bindFormSubmissionHotkey = (submissionHandler) => {
  window.addEventListener("keydown", formSubmissionListener);
};

export const unbindFormSubmissionHotkey = () =>
  window.removeEventListener("keydown", formSubmissionListener);

export const highlightSearchTerms = (text, term) => {
  let re = new RegExp(term, 'ig');
  return  text.replaceAll(re, "<span className='search-highlight'>$&</span>")
}

export const checkEmptyRequirement = (requirementTest, field) =>
  requirementTest && field.length === 0;

export const printEmptyRequirementClass = (requirementTest, field) =>
  checkEmptyRequirement(requirementTest, field) ? "empty-requirement" : "";

export const escapeRegex = (input) => input.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');

export const getPageClass = (page) => `${page.toLowerCase()}-page`;

export const isImageUrl = (url) => url.length > 0 && 
  notNullOrUndefined(url.toLowerCase().match(/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i));