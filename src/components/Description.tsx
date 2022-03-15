import React, { useState } from 'react';
import "../styles/description.scss";
import { useNavigate } from 'react-router-dom';
import { useLayoutEffect } from 'react';

interface Props {
  localState: any,
  setLocalState: React.Dispatch<any>
}

const Description: React.FC<Props> = ({localState, setLocalState}) => {
  const [description, setDescription] = useState<string>("");
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();

  useLayoutEffect(()=>{
    if(localState.description)
      setDescription(localState.description);
  },[localState])

  const handleClick = () => {
    if(!description || description.length < 10) return setError("Decription must be at least 10 characters long");
    else if(description.length>1000) return setError("Description should not be more than 1000 characters long");
    setLocalState({...localState, description});
    navigate("../productadditionals");
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setError("");
    setDescription(e.currentTarget.value);
  }
  
  return (
    <div className="description-wrapper">
      <div className="textarea-wrapper">
        <textarea style={error?{border:"2px solid red"}:{}} placeholder="Description" value={description} onChange={handleChange} />
        <div style={description.length<10||description.length>1000?{color:'red'}:{}} className="counter">{description.length}/1000</div>
      </div>
      <button onClick={handleClick}>Next</button>
      {error?<div className="error-div">{error}</div>:null}
    </div>
  )
}

export default Description;
