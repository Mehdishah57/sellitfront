import React from 'react';
import "../styles/card.scss";

interface Props{
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
  onClick: (_id: string)=>void
}

const Card: React.FC<Props> = ({item, onClick}) => {
  return (
    <div onClick={(e)=>onClick(item._id)} className="card-container">
      <img src={item.picture.image1.url} alt=""/>
      <h3 className="price">RS: {item.price}</h3>
      <h3 className="title">{item.title}</h3>
    </div>
  )
}

export default Card;