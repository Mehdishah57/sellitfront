import axios from "axios";

const signup = async (payload:any) => {
  try {
    const {data} = await axios.post(`${process.env.REACT_APP_SERVER}/api/user/signup`,payload);
    return {data, error:null}
  } catch (error) {
    return {data:null, error}
  }
}

export default signup;