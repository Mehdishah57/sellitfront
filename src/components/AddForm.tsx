import React, { useState, useLayoutEffect, useContext, useRef } from "react";
import getCategories from "../services/getCategories";
import { UserContext } from "../global/UserContext";
import FullScreenLoader from "./FullScreenLoader";
import { useHistory, Route, Redirect, Switch } from "react-router-dom";

import "../styles/addform.scss";
import TitleForm from "./TitleForm";
import Category from "./Category";
import Description from './Description';
import ProductAddtionals from './ProductAddtionals';
import addProduct from './../services/addProduct';
import PreviewAd from './PreviewAd';


const AddForm: React.FC = () => {
  const [localState, setLocalState] = useState<any>({});

  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const [categoryData, setCategoryData] = useState<any>(null);

  const { state } = useContext(UserContext);

  const history = useHistory();

  const fetchCategories = useRef<any>(null);

  fetchCategories.current = async () => {
    setLoading(true);
    const { data, error } = await getCategories();
    if (error) setError("Problem With Server 500 Error");
    if (data) setCategoryData(data);
    setLoading(false);
  };

  useLayoutEffect(() => {
    fetchCategories.current();
  }, []);

  const formSubmission = async() => {
    setLoading(true);
    const formData = new FormData();
    Object.keys(localState).map( key => key==="mainCategory" ? formData.append(`${key}`,localState[key].name) : formData.append(`${key}`,localState[key]) );
    Object.keys(localState.picture).map( key => formData.append(key,localState.picture[key]) );
    formData.append("owner",state._id);
    const { data, error } = await addProduct(formData, state.clientIdentity);
    if(error) console.log(error.response)
    if(data) console.log(data)
    setLoading(false);
  }

  if (!state || !state._id) history.push("/dashboard/login");
  if (loading) return <FullScreenLoader />;
  if(error) return <div className="form-container">{error}</div>;
  return (
    <div className="form-container">
      <Switch>
        <Route path="/dashboard/addForm/category" component={()=><Category categoryData={categoryData} state={localState} setState={setLocalState}/>}/>
        <Route path="/dashboard/addForm/titleForm" component={()=>< TitleForm localState={localState} setLocalState={setLocalState}/>} />
        <Route path="/dashboard/addForm/description" component={()=><Description localState={localState} setLocalState={setLocalState}/>} />
        <Route path="/dashboard/addForm/productadditionals" component={()=><ProductAddtionals localState={localState} setLocalState={setLocalState} />} />
        <Route path="/dashboard/addForm/previewAd" component={()=><PreviewAd localState={localState} submitForm={formSubmission}/>} />
        <Redirect to="/dashboard/addForm/category" />
      </Switch>
    </div>
  );
};

export default AddForm;