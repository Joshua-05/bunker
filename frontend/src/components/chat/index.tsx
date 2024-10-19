import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import style from "./style.module.css"
import { useUserStore } from "../../store";

interface IMessage {
    sender: string;
    text: string;
}

const socket = io(`http://localhost:3000`);
const Chat = () => {
    const user = useUserStore(state => state.userStore)
    const [messages, setMessages] = useState<IMessage[]>([]);
    const messageEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {

        socket.on('message', (message) => {
            setMessages((prev) => [...prev, message]);
        });

        return () => {
            socket.off('message'); // Чистим обработчик при размонтировании
        };
    }, [])

    useEffect(() => {
        if (messageEndRef.current) {
            messageEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    const sendMessage = (messageText: string) => {
        const message = { sender: user?.username, text: messageText };
        socket.emit('message', message); // Отправка сообщения на сервер
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