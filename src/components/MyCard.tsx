import React, { useRef } from 'react';
import "../styles/mycard.scss";

interface Props {
  item: {
    _id: string
    title: string
    price: string
    description: string
    owner: string
    picture: {
      image1: {url: string, id: string}
      image2?: {url: string, id: string}
      image3?: {url: string, id: string}
      image4?: {url: string, id: string}
      image5?: {url: string, id: string}
      image6?: {url: string, id: string}
    }
  },
  onClick: (_id: string)=>void,
  onDelete: (_id: string)=>void
}

const MyCard: React.FC<Props> = ({item, onClick, onDelete}) => {
  const options = useRef<HTMLDivElement | null>(null);

  const displayOptions = () => {
    if(options.current?.style)
      options.current.style.transform = "translate(260px)";
  }  

  const closeMenu = () => {
    if(options.current?.style)
      options.current.style.transform = "translate(210px)";
  }

  return (
    <div style={{position:"relative",display:'flex',flexDirection:'row',marginRight:'60px'}}>
      <h3 onClick={()=>displayOptions()} className="mycard-options">
        <i className="fa fa-bars" aria-hidden="true"></i>
      </h3>
      <div onClick={(e)=>onClick(item._id)} className="card-container">
        <img src={item.picture.image1.url} alt=""/>
        <h3 className="price">RS: {item.price}</h3>
        <h3 className="title">{item.title}</h3>
      </div>
      <div ref={options} className="options-menu">
        <li onClick={closeMenu}><i className="fa fa-arrow-left" aria-hidden="true"></i></li>
        <li onClick={()=>onDelete(item._id)}><i className="fa fa-times" aria-hidden="true"></i></li>
        <li><i className="fa fa-eye" aria-hidden="true"></i></li>
        <li><i className="fa fa-eye-slash" aria-hidden="true"></i></li>
      </div>
    </div>
  )
}

export default MyCard;
