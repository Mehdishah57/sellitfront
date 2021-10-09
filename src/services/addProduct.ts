import axios from "axios";

const addProduct = async (formData: FormData, clientIdentity: string) => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_SERVER}/api/product/add`,
      formData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
          "clientIdentity": clientIdentity,
        },
      }
    );
    return { data, error: null };
  } catch (error: any) {
    return { data: null, error };
  }
};

export default addProduct;
