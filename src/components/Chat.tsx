import React, { useRef, useEffect, useState, useContext } from 'react';
import { UserContext } from '../global/UserContext';
import FullScreenLoader from './FullScreenLoader';
import getChat from "../services/getChat";
import "../styles/chat.scss";

const Chat: React.FC = () => {
    let { current: message } = useRef("");
    let fetchData = useRef<any>();
    const inputRef = useRef<HTMLInputElement | null>(null);

    const [data, setData] = useState<any>({});
    const [loading, setLoading] = useState(true);

    const { state } = useContext(UserContext);

    fetchData.current = async () => {
        const { data, error } = await getChat(state.email,
            state.productOwner,
            state.productOwnerEmail,
            state.productId,
            state.clientIdentity);
        if(error) return setLoading(false);
        setData(data);
        setLoading(false);
    }

    useEffect(()=>{
        fetchData.current();
    },[]);

    const sendMessage = () => {
        alert(message);
        inputRef?.current && (inputRef.current.value="")
    }

    if(loading) return <FullScreenLoader />
    return (
        <div className="chat-main-wrapper">
            <header>
                <section className="product">
                    <img src="" alt="" />
                    <strong>Product Name</strong>
                </section>
                <section className="owner">
                    <strong>Owner Name</strong>
                </section>
            </header>
            <main>
                {JSON.stringify(data)}
            </main>
            <footer>
                <div className="field-wrapper">
                <div className="sub-wrapper">
                    <input
                        ref={inputRef} 
                        type="text"
                        placeholder="Message" 
                        onChange={ e => message = e.currentTarget.value} id="" 
                    />
                </div>
                <button onClick={sendMessage}>
                    <i className="fa fa-paper-plane-o" aria-hidden="true"></i>
                </button>
                </div>
            </footer>
        </div>
    )
}

export default Chat
