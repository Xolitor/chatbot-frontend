import { useEffect, useRef } from 'react';
import Message from './Message';

const ChatWindow = ({ messages }) => {
    const messagesEndRef = useRef(null);
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <div className="chat-window">
            {messages.map((message, index) => (
            <div key={index} className={`message ${message.role}`}>
                <div className="bubble">{message.content}</div>
            </div>
    ))}
</div>

    );
};

export default ChatWindow;
