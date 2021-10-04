import axios from "axios";

const getCategories = async() => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_SERVER}/api/category`
      );
      return {data, error:null};
    } catch (error) {
      return {data:null, error}
    }
}

export default getCategories;