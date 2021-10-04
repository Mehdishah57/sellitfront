import axios from "axios";

const reload = async() => {
  try {
    const { data } = await axios.post(`${process.env.REACT_APP_SERVER}/api/user/refresh`,{token:"poop"},{withCredentials: true});
    return {data, error:null};
  } catch (error) {
    return {data:null, error};
  }
}

export default reload;