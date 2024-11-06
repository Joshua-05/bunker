import { useEffect, useRef, useState } from "react";
import style from "./style.module.css"
import { useUserStore } from "../../store";
import socket from "../../utils/socket";

interface IMessage {
    sender: string;
    text: string;
}

interface ChatProps{
    lobbyId: string | undefined
}


const Chat = ({lobbyId}: ChatProps) => {
    const user = useUserStore(state => state.userStore)
    const [messages, setMessages] = useState<IMessage[]>([]);
    const messageEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        socket.emit('joinLobby', lobbyId); 

        socket.on('message', (message) => {
            setMessages((prev) => [...prev, message]);
            console.log(message);
            
        });

        return () => {
            // socket.off('joinLobby');
            socket.off('message'); 
        };
    }, [lobbyId])

    useEffect(() => {
        if (messageEndRef.current) {
            messageEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    const sendMessage = (messageText: string) => {
        const message = {lobbyId, sender: user?.username, text: messageText};
        socket.emit('message', message); 
    };

    return(
        <div className={style.chat}>
            <h1>Chat</h1>
            <div>
                {messages.map((msg, index) => (
                    <p key={index}><strong>{msg.sender}:</strong> {msg.text}</p>
                ))}
                <div ref={messageEndRef} /> 
            </div>
            <input 
                type="text" 
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        const inputElement = e.target as HTMLInputElement
                        inputElement.value != '' && sendMessage(inputElement.value)
                        inputElement.value = ""
                    }
                }} 
            />
        </div>
    )
}

export default Chat