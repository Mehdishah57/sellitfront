import axios from "axios";

const addProduct = async (formData: FormData, state: any) => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_SERVER}/api/product/add`,
      formData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
          "clientIdentity": state.clientIdentity,
        },
      }
    );
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

export default addProduct;
