import React, { useState } from 'react'

import"../styles/titleform.scss";

const TitleForm: React.FC<{setLocalState: React.Dispatch<React.SetStateAction<string>>, localState: any}> = ({setLocalState, localState}) => {
  const [title, setTitle] = useState<string>("");
  const [placeholderStyle] = useState<any>({left: "0px",top:"0px",fontSize: "10px"});
  return (
    <div className="title-form">
      <div className="title-form-field-wrapper">
        <div style={title.length>0?placeholderStyle:null} className="title-placeholder">Enter Ad Title Here</div>
        <input type="text" value={title} onChange={(e)=>setTitle(e.currentTarget.value)} />
      </div>
      <button onClick={()=>setLocalState({...localState, title})}>Next</button>
    </div>
  )
}

export default TitleForm
