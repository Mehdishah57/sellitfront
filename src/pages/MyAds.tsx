import React, { useContext, useEffect, useRef, useState } from 'react';
import "../styles/myad.scss";
import { UserContext } from './../global/UserContext';
import getUserAds from './../services/getUserAds';
import FullScreenLoader from './../components/FullScreenLoader';
import { useNavigate } from 'react-router-dom';
import MyCard from './../components/MyCard';
import deleteMyProduct from './../services/deleteMyProduct';
import activateMyProduct from '../services/activateMyAd';
import deactivateMyProduct from './../services/deactivateMyAd';

const MyAds: React.FC = () => {
  const { state } = useContext(UserContext);
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const fetchData = useRef<any>(null);
  const navigate = useNavigate()

  fetchData.current = async() => {
    setLoading(true);
    if(!state && !state._id) return;
    const { data, error } = await getUserAds(state._id, state.clientIdentity);
    if(error) setError("There was some Issue loading Ads");
    if(data) setData(data);
    setLoading(false);
  }

  useEffect(()=>{
    if(state && state._id)
      fetchData.current();
  },[state]);

  const handleCardClick = (_id: string) => {
    navigate(`/dashboard/productInfo/${_id}`);
  }

  const handleAdDelete = async(_id: string) => {
    const { error } = await deleteMyProduct(_id,state.clientIdentity);
    if(error) return alert("Error Deleting Product");
    const tempArr = data.filter( (item: any) => item._id !== _id);
    setData(tempArr);
  }

  const handleItemActivation = async(_id: string) => {
    setLoading(true);
    const { error } = await activateMyProduct(_id, state.clientIdentity);
    if(error) console.log(error);
    if(!error) data.map( item => item._id === _id? item.active = true: null)
    setLoading(false);
  }

  const handleItemDeactivation = async(_id: string) => {
    setLoading(true);
    const { error } = await deactivateMyProduct(_id, state.clientIdentity);
    if(error) console.log(error);
    if(!error) data.map( item => item._id === _id? item.active = false: null)
    setLoading(false);
  }

  if(loading) return <FullScreenLoader />
  if(error) return <div className="myad-container">
    <h3 className="alternate-h3">There was some error {console.log(error)}</h3>
  </div>
  return (
    <div className="myad-container">
      {data? data.map( (item: any) => <MyCard onClick={handleCardClick} key={item._id} item={item} onDelete={handleAdDelete} onActiveClick={handleItemActivation} onDeactiveClick={handleItemDeactivation} /> ): null}
      {((data && !data.length) && !loading) ? <h3 className="alternate-h3">Post some Ads</h3> : null}
    </div>
  )
}

export default MyAds;