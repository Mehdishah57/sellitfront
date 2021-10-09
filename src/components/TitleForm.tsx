import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import"../styles/titleform.scss";
import { useLayoutEffect } from 'react';

const TitleForm: React.FC<{setLocalState: React.Dispatch<React.SetStateAction<string>>, localState: any}> = ({setLocalState, localState}) => {
  const [title, setTitle] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [placeholderStyle] = useState<any>({left: "0px",top:"0px",fontSize: "10px"});
  
  const history = useHistory();

  useLayoutEffect(()=>{
    if(localState.title)
      setTitle(localState.title)
  },[localState])

  function btnClick() {
    if(!title) return setError("Bad Input");
    setLocalState({...localState, title});
    history.push("/dashboard/addForm/description");
  }
  return (
    <div className="title-form">
      <div className="title-form-field-wrapper">
        <div style={title.length>0?placeholderStyle:null} className="title-placeholder">Enter Ad Title Here</div>
        <input style={error?{borderBottom:"2px solid red"}:{}} type="text" value={title} onChange={(e)=>{setError("");setTitle(e.currentTarget.value)}} />
      </div>
      <button onClick={()=>btnClick()}>Next</button>
    </div>
  )
}

export default TitleForm
