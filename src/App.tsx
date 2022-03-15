import React ,{ useState, useEffect, useRef } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { UserContext } from './global/UserContext';
import reload from './services/reload';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import { Socket } from 'socket.io-client';
import { io } from 'socket.io-client';
import './App.scss';

interface State {
  _id?: string
  name?: string
  email?: string
  picture?: string
}

const App = () => {
  const [state, setState] = useState<State|null>(null);
  const [socket, setSocket] = useState<Socket<any, any> | null>(null);
  const appReload = useRef<any>(null);

  appReload.current = async() => {
    const {data} = await reload();
    if(!data) return;
    setState({...data});
  }

  useEffect(()=>{
    appReload.current();
  },[]);

  useEffect(()=>{
    if(state && state._id && !socket){
      setSocket(io(`${process.env.REACT_APP_SERVER}`,{
        withCredentials: true
      }))
    }
  },[state, socket])

  useEffect(()=>{
    if(socket){
      socket.off("connect").on("connect", () => {
        console.log("Connected");
        //online-offline functionality
      })
    }
  },[socket]);

  return (
    <UserContext.Provider value={{state, setState, socket}}>
      <Navbar />
      <Routes>
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Navigate to="/dashboard/home" />} />
      </Routes>
    </UserContext.Provider>
  );
}

export default App;