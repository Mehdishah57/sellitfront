import axios from "axios";

const uploadUserImage = async(formData: FormData, state: any) => {
  try {
    const { data } = await axios.patch(`${process.env.REACT_APP_SERVER}/api/user/userImage`,formData, { withCredentials: true, headers: { clientIdentity: state.clientIdentity } })
    return { data, error:null }
  } catch (error) {
    return { data:null, error }
  }
}

export default uploadUserImage;