import axios from "axios";

const getUserAds = async (id: string, clientIdentity: string) => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_SERVER}/api/user/getUserAds/${id}`,
      { withCredentials: true, headers: { clientIdentity } }
    );
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

export default getUserAds;
