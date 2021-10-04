import axios from 'axios';

const getProductInfo = async(id: string) => {
  try {
    const { data } = await axios.get(`${process.env.REACT_APP_SERVER}/api/product/${id}`)
    return { data, error:null }
  } catch (error) {
    return { error, data:null }
  }
}

export default getProductInfo;
