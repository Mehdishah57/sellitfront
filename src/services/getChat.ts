import axios from "axios";

const getChat = async (email:string,
    productOwner: string,
    productOwnerEmail: string,
    clientIdentity: string,
    productId:string) => {
    try {
        const { data } = await axios.post(`${process.env.REACT_APP_SERVER}/api/user/messsages`,{email,productId,productOwner,productOwnerEmail},{withCredentials:true, headers: { clientIdentity }})
        return { data, error:null }
    } catch (error) {
        return { data:null, error }
    }
}

export default getChat;