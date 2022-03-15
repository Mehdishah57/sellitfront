import React, { useState, useLayoutEffect, useContext, useRef } from "react";
import getCategories from "../services/getCategories";
import { UserContext } from "../global/UserContext";
import FullScreenLoader from "./FullScreenLoader";
import { useNavigate, Route, Routes, Navigate } from "react-router-dom";
import TitleForm from "./TitleForm";
import Category from "./Category";
import Description from './Description';
import ProductAddtionals from './ProductAddtionals';
import addProduct from './../services/addProduct';
import { Toaster, toast } from "react-hot-toast"

import "../styles/addform.scss";

const AddForm: React.FC = () => {
  const [localState, setLocalState] = useState<any>({});

  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const [categoryData, setCategoryData] = useState<any>(null);

  const { state } = useContext(UserContext);

  const navigate = useNavigate();

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
    if(data) navigate("/dashboard/myads")
  }

  if (!state || !state._id) navigate("/dashboard/login");
  if (loading) return <FullScreenLoader />;
  if(error) return <div className="form-container">{error}</div>;
  return (
    <div className="form-container">
      <Toaster />
      <Routes>
        <Route path="category" element={<Category categoryData={categoryData} state={localState} setState={setLocalState}/>}/>
        <Route path="titleForm" element={< TitleForm localState={localState} setLocalState={setLocalState}/>} />
        <Route path="description" element={<Description localState={localState} setLocalState={setLocalState}/>} />
        <Route path="productadditionals" element={<ProductAddtionals localState={localState} submitForm={formSubmission} setLocalState={setLocalState} />} />
        <Route path="/" element={<Navigate to="category" />} />
      </Routes>
    </div>
  );
};

export default AddForm;