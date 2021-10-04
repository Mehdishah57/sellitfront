import axios from "axios";

const search = async() => {
  try {
    const { data } = await axios.post(`${process.env.REACT_APP_SERVER}/api`)
  } catch (error) {
    return { data:null, error }
  }
}

export default search;