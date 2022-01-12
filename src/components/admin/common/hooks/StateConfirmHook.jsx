import { useState, useRef } from "react";

/*
  useStateConfirm - a wrapper for useState that provides a third return
  value that confirms whether or not changes set in motion by setState
  have taken effect 
*/
const useStateConfirm = (initialValue) => {
  const [ state, setState ]   = useState(initialValue);
  const loadRef               = useRef(initialValue);

  const handleSetState = (newState) => {
    setState(newState);
    loadRef.current = newState;
  }

  // problem here - how do I distinguish between the state finally reaching the initial value
  // and the state finally reaching its new, proper value? 
  return [state, handleSetState, loadRef.current === state]; 
  // return [state, handleSetState, state !== initialValue && loadRef.current === state]; 
};

export default useStateConfirm;