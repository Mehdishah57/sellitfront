import axios from 'axios';

const deleteMyProduct = async(_id: string, clientIdentity: string) => {
  try {
    const { data } = await axios.delete(`${process.env.REACT_APP_SERVER}/api/product/${_id}`,{withCredentials:true, headers: {clientIdentity}});
    return { data, error:null }
  } catch (error) {
    return { data:null, error }
  }
}

export default deleteMyProduct;