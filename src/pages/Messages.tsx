import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from './../global/UserContext';

const Messages: React.FC = () => {

  const { state } = useContext(UserContext)
  
  const history = useHistory();

  if(!state || !state._id){
    history.push("/dashboard/home");
    return <div></div>
  }
  
  return (
    <div>
      Messages
    </div>
  )
}

export default Messages;