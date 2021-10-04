import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import Home from './../pages/Home';
import Profile from './../pages/Profile';
import Messages from './../pages/Messages';
import AddForm from './AddForm';
import MyAds from './../pages/MyAds';
import ProductInfo from './../pages/ProductInfo';


const Dashboard: React.FC = () => {

  return (
    <div>
      <Switch>
        <Route path="/dashboard/productInfo/:id" component={ProductInfo}/>
        <Route path="/dashboard/myads" component={MyAds} />
        <Route path="/dashboard/addForm" component={AddForm} />
        <Route path="/dashboard/home" component={Home} />
        <Route path="/dashboard/profile" component={Profile} />
        <Route path="/dashboard/messages" component={Messages} />
        <Redirect to="/dashboard/home" />
      </Switch>
    </div>
  );
}

export default Dashboard;