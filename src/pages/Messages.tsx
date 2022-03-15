import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './../global/UserContext';
import Chat from "../components/Chat";
import "../styles/message.scss";

const Messages: React.FC = () => {

  const { state } = useContext(UserContext)
  
  const navigate = useNavigate();

  useEffect(()=>{
    if(!state?._id) navigate("../home")  
  },[state,navigate])

  if(!state || !state._id) return <div></div>

  if(state?.productId && state?.productOwner) 
    return <Chat />
  return (
    <div className="message-main-wrapper">
      Feature Dropped to avoid Repetitive Work <br />
      and to work on more projects
    </div>
  )
}

export default Messages;