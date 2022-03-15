import axios from "axios";

const searchProducts = async(search: string, pageSize: string | number, pageNumber: string | number) => {
    try {
        const { data } = await axios.post(`${process.env.REACT_APP_SERVER}/api/product/search`,{search,pageNumber,pageSize});
        return { data, error:null }
    } catch (error) {
        return { data:null, error }
    }
}

export default searchProducts;