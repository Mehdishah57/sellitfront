import React from 'react'
import logo from "../loading-buffering.gif"

import "../styles/fullscreenloader.scss";

const FullScreenLoader: React.FC = () => {
  return (
    <div className="loader-container">
      <img src={logo} alt="" />
    </div>
  )
}

export default FullScreenLoader;
