import io from "socket.io-client";

let socket = io(`${process.env.REACT_APP_SERVER}`,{
  withCredentials: true
});

export default socket;