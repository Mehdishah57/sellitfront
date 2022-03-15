import React from 'react';
import { Route, Navigate, Routes } from 'react-router-dom';
import Home from './../pages/Home';
import Profile from './../pages/Profile';
import Messages from './../pages/Messages';
import AddForm from './AddForm';
import MyAds from './../pages/MyAds';
import ProductInfo from './../pages/ProductInfo';


const Dashboard: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path="productInfo/:id" element={<ProductInfo />}/>
        <Route path="myads" element={<MyAds />} />
        <Route path="addForm/*" element={<AddForm />} />
        <Route path="home" element={<Home />} />
        <Route path="profile" element={<Profile />} />
        <Route path="messages" element={<Messages />} />
        <Route path="/" element={<Navigate to="home" />} />
      </Routes>
    </div>
  );
}

export default Dashboard;