import axios from 'axios';

const getHomeAds = async(pageSize: number, pageNumber: number) => {
  try {
    const { data } = await axios.get(`${process.env.REACT_APP_SERVER}/api/product/getAllAds?pageSize=${pageSize}&pageNumber=${pageNumber}`);   
    return {data, error:null}
  } catch (error) {
    return {data: null, error}
  }
}

export default getHomeAds;
