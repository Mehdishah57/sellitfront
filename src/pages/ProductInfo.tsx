import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import getProductInfo from '../services/getProductInfo';
import FullScreenLoader from './../components/FullScreenLoader';
import "../styles/productInfo.scss";

const ProductInfo = () => {
  const [data, setData] = useState<any>();
  const [error, setError] = useState<any>("");
  const [activeImage, setActiveImage] = useState<any>("");
  const fetchProductInfo = useRef<any>(null);

  const { id }: any = useParams();

  fetchProductInfo.current = async () => {
    const { error, data } = await getProductInfo(id);
    if(error || !data) return setError("Issue Loading Ads");
    setData(data);setActiveImage(data.picture.image1.url);
  }

  useEffect(()=>{
    if(!id) return;
    fetchProductInfo.current();
  },[id]);

  const nextImg = () => {
    const images = Object.keys(data.picture);
    if(images.length === 1) return;
    for (let img in images){
      try {
        if(data.picture[images[img]].url === activeImage){
          setActiveImage(data.picture[images[images.indexOf(images[img])+1]].url)
          break;
        }
      } catch (error) {
        break;
      }
    }
  }

  const prevImg = () => {
    const images = Object.keys(data.picture);
    if(images.length === 1) return;
    for (let img in images){
      try {
        if(data.picture[images[img]].url === activeImage){
          setActiveImage(data.picture[images[images.indexOf(images[img])-1]].url)
          break;
        }
      } catch (error) {
        break;
      }
    }
  }

  if(error && !data) return <div className="product-info-container">
    <h3 className="alternate-h3">Ad is no longer Published</h3>
  </div>
  else if(!data) return <FullScreenLoader />
  return (
    <div className="product-info-container">
      <div className="image-container">
        <div onClick={prevImg} className="button-left">
          <i className="fa fa-arrow-left" aria-hidden="true"></i>
        </div>
        <div onClick={nextImg} className="button-right">
          <i className="fa fa-arrow-right" aria-hidden="true"></i>
        </div>
        <img width="70%" src={activeImage} alt="" />
      </div>
      <div className="title-container">{data.title}</div>
      <div className="price-container">RS: {data.price}</div>
      <div className="description-container">{data.description}</div>
      <div className="owner-info">
        <div className="image-wrapper">
          <img src={data.owner.picture.url} alt="" />
        </div>
        <span className="owner-name">Name: {data.owner.name}</span>
        <a className="owner-phone" href={`tel:${data.owner.phone}`}>Call</a>
        <button className="message-button">Message</button>
      </div>
    </div>
  )
}

export default ProductInfo;
