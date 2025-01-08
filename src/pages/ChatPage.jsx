import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import ChatWindow from '../components/ChatWindow';
import MessageInput from '../components/MessageInput';
import { chatApi } from '../services/api';

function ChatPage({ user, onLogout }) {
    const [messages, setMessages] = useState([]);
    const [sessions, setSessions] = useState([]);
    const [currentSession, setCurrentSession] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const newSession = `session-${Date.now()}`;
        setCurrentSession(newSession);
        loadSessions();
    }, []);

    useEffect(() => {
        if (currentSession) {
            loadHistory();
        }
    }, [currentSession]);

    const loadSessions = async () => {
        try {
            const response = await chatApi.getAllSessions();
            setSessions(response);
        } catch (error) {
            console.error('Error loading sessions:', error);
        }
    };

    const loadHistory = async () => {
        try {
            const history = await chatApi.getHistory(currentSession);
            setMessages(history);
        } catch (error) {
            console.error('Error loading history:', error);
        }
    };

    const handleSendMessage = async (content) => {
        if (!currentSession) return;
        setIsLoading(true);
        try {
            const response = await chatApi.sendMessage(content, currentSession);
            setMessages(prev => [
                ...prev,
                { role: 'user', content },
                { role: 'assistant', content: response.response }
            ]);
        } catch (error) {
            console.error('Error sending message:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="chat-page">
            <Header user={user} onLogout={onLogout} />
            <div className="chat-page__content">
                <Sidebar
                    sessions={sessions}
                    currentSession={currentSession}
                    onSessionChange={setCurrentSession}
                />
                <div className="chat-page__chat-container">
                    <ChatWindow messages={messages} />
                    <MessageInput onSendMessage={handleSendMessage} isLoading={isLoading} />
                </div>
            </div>
        </div>
    );
}

export default ChatPage;
