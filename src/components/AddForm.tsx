import React, { useState, useLayoutEffect, useContext, useRef } from "react";
import getCategories from "../services/getCategories";
import { UserContext } from "../global/UserContext";
import FullScreenLoader from "./FullScreenLoader";
import { useHistory, Route, Redirect, Switch } from "react-router-dom";

import "../styles/addform.scss";
import TitleForm from "./TitleForm";
import Category from "./Category";


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

  if (!state || !state._id) history.push("/dashboard/login");
  if (loading) return <FullScreenLoader />;
  if(error) return <div className="form-container">{error}</div>;
  return (
    <div className="form-container">
      <Switch>
        <Route path="/dashboard/addForm/category" component={()=><Category categoryData={categoryData} state={localState} setState={setLocalState}/>}/>
        <Route path="/dashboard/addForm/titleForm" component={()=>< TitleForm localState={localState} setLocalState={setLocalState}/>} />
        <Redirect to="/dashboard/addForm/category" />
      </Switch>
      {/* {
        !localState.mainCategory && categoryData && <div>{categoryData.map(
          (category: any) => <div className="category" onClick={()=>setLocalState({...localState,mainCategory:category})} key={category._id}>{category.name}</div>
        )}</div>
      }
      {
        localState.mainCategory && !localState.subCategory && <div>{localState.mainCategory.subCategories?.map(
          (subCategory: string) => <div className="category" onClick={()=>setLocalState({...localState, subCategory})} key={localState.mainCategory._id}>{subCategory}</div> )
        }</div>
      }
      {
        localState.mainCategory && localState.subCategory && !localState.title && <TitleForm localState={localState} setLocalState={setLocalState} />
      } */}
      {/* {Object.keys(localState).map((key) => <div onClick={()=>setLocalState({...localState,[key]:null})} className="change-entry">{typeof localState[key] === 'string'? localState[key]: localState[key]?.name || localState[key]?.title}</div>)} */}
    </div>
  );
};

export default AddForm;