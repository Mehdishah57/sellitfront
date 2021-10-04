import axios from 'axios';

interface Props {
  email: string
  password: string
}

const login = async(props: Props) => {
  try {
    const { data } = await axios.post(`${process.env.REACT_APP_SERVER}/api/user/login`, props, {withCredentials: true});
    return {data, error:null};
  } catch (error: any) {
    return {data:null, error}
  }
}

export default login;