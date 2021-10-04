import axios from "axios";

const logout = async(event:(React.MouseEvent<HTMLLIElement> | React.MouseEvent<HTMLAnchorElement>), setState:any) => {
  try {
    const { data } = await axios.post(`${process.env.REACT_APP_SERVER}/api/user/logout`,{},{withCredentials:true});
    setState(null);
    return {data, error:null}
  } catch (error) {
    return {data:null, error}
  }
}

export default logout;