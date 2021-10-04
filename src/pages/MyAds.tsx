import React, { useContext, useEffect, useRef, useState } from 'react';
import "../styles/myad.scss";
import { UserContext } from './../global/UserContext';
import getUserAds from './../services/getUserAds';
import FullScreenLoader from './../components/FullScreenLoader';
import { useHistory } from 'react-router-dom';
import MyCard from './../components/MyCard';
import deleteMyProduct from './../services/deleteMyProduct';

const MyAds: React.FC = () => {
  const { state } = useContext(UserContext);
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const fetchData = useRef<any>(null);
  const history = useHistory()

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
    history.push(`/dashboard/productInfo/${_id}`);
  }

  const handleAdDelete = async(_id: string) => {
    const { error } = await deleteMyProduct(_id,state.clientIdentity);
    if(error) return alert("Error Deleting Product");
    const tempArr = data.filter( (item: any) => item._id !== _id);
    setData(tempArr);
  }

  if(loading) return <FullScreenLoader />
  if(error) return <div className="myad-container">
    <h3 className="alternate-h3">There was some error {console.log(error)}</h3>
  </div>
  return (
    <div className="myad-container">
      {data? data.map( (item: any) => <MyCard onClick={handleCardClick} key={item._id} item={item} onDelete={handleAdDelete} /> ): null}
      {((data && !data.length) && !loading) ? <h3 className="alternate-h3">Post some Ads</h3> : null}
    </div>
  )
}

export default MyAds;