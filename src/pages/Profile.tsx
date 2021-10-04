import React, { useContext, useState } from 'react';
import { UserContext } from './../global/UserContext';
import "../styles/profile.scss";
import { Link, useHistory } from 'react-router-dom';
import logout from './../services/logout';
import uploadUserImage from './../services/uploadUserImage';

const Profile: React.FC = () => {
  const [picture , setPicture] = useState<any>(null);
  const [displayImg, setDisplayImg] = useState<string>("");
  const { state, setState } = useContext(UserContext);

  const history = useHistory();

  const handleImageChange: React.ChangeEventHandler<HTMLInputElement> = async(e) => {
    if(!e.currentTarget.files) return;
    setPicture(e.currentTarget.files[0]);
    setDisplayImg(URL.createObjectURL(e.currentTarget.files[0]));
  }

  const handleUpload: React.MouseEventHandler = async(e) => {
    const formData = new FormData()
    formData.append('file',picture);
    const { data , error } = await uploadUserImage(formData, state);
    if(error) return;
    if(data && data.picture) setState({...state,picture: data.picture});
    setDisplayImg("");
    setPicture(null);
  }
  if(!state || !state._id){
    history.push("/dashboard/home");
    return <div></div>
  }
    return (
      <div className="profile-container">
        <div className="image-container">
          {
            state && state.picture && state.picture.url?
            <div className="wrapper">
              <input type="file" onChange={handleImageChange} />
              <img style={{position:'absolute'}} width="100%" src={state.picture.url} alt=""/>
            </div>
            :<div className="wrapper">
              <input type="file" onChange={handleImageChange} />
              {displayImg?<img src={displayImg} width="100%" style={{position:'absolute'}} alt="" />:<i id="icon-size-x" className="fa fa-user-o" aria-hidden="true"></i>}
            </div>
          }
        </div>
        { displayImg?<button onClick={handleUpload}>Upload</button>:null }
        <div className="profile-name">{`${state?.name}`}</div>
        <Link to="/dashboard/myads">My Ads</Link>
        <Link to="/dashboard/addForm">Post an Ad</Link>
        <Link onClick={(e)=>logout(e,setState)} to="/dashboard/login">Logout</Link>
      </div>
    )
}

export default Profile;
