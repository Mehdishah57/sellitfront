import axios from 'axios';

const deactivateMyProduct = async(_id: string, clientIdentity: string) => {
  try {
    await axios.put(`${process.env.REACT_APP_SERVER}/api/product/deactivate/${_id}`,{},{withCredentials:true, headers: {clientIdentity}})
    return {error:null}
  } catch (error: any) {
    return {error}
  }
}

export default deactivateMyProduct;