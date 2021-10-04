import React,{ useState, useEffect, useRef } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.scss';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { UserContext } from './global/UserContext';
import reload from './services/reload';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import { Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io-client/build/typed-events';
import { io } from 'socket.io-client';

interface State {
  _id?: string
  name?: string
  email?: string
  picture?: string
}

const App = () => {
  const [state, setState] = useState<State|null>(null);
  const [socket, setSocket] = useState<Socket<DefaultEventsMap, DefaultEventsMap> | null>(null);
  const appReload = useRef<any>(null);

  appReload.current = async() => {
    const {data} = await reload();
    if(!data) return;
    setState({...data});
  }

  useEffect(()=>{
    appReload.current()
  },[]);

  useEffect(()=>{
    if(state && state._id){
      setSocket(io(`${process.env.REACT_APP_SERVER}`,{
        withCredentials: true
      }))
    }
  },[state])

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
      <Switch>
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Redirect to="/dashboard/home" />
      </Switch>
    </UserContext.Provider>
  );
}

export default App;