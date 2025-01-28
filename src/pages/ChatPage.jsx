import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import ChatWindow from '../components/ChatWindow';
import MessageInput from '../components/MessageInput';
import { chatApi } from '../services/api';
import { v4 as uuidv4 } from 'uuid';

// import clippy from 'clippyjs/dist/clippy';

// const clippy = require('clippyjs');
 
// clippy.load('Merlin', (agent) => {
//     // do anything with the loaded agent
//     agent.show();
// });

function ChatPage({ user, onLogout }) {
    const [messages, setMessages] = useState([]);
    const [sessions, setSessions] = useState([]);
    const [agents, setAgents] = useState(['Maths', 'Français', 'Histoire', 'RAG']);
    const [currentSession, setCurrentSession] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const newSession = `session-${uuidv4()}`;
        setCurrentSession(newSession);
        loadSessions();
    }, []);

    useEffect(() => {
        if (currentSession && currentSession !== 'NewSession') {
            loadHistory();
        } else if (currentSession === 'NewSession') {
            const newSession = `session-${uuidv4()}`;
            setCurrentSession(newSession);
            loadSessions();
        }
    }, [currentSession]);

    const loadSessions = async () => {
        try {
            const response = await chatApi.getAllSessions();
            console.log('Sessions:', response);
            setSessions(response);
        } catch (error) {
            console.error('Error loading sessions:', error);
        }
    };

    const loadHistory = async () => {
        try {
            if (currentSession === 'Maths' || currentSession === 'Français' || currentSession === 'Histoire') {
                const history = await chatApi.getHistoryTeacher(currentSession);
                setMessages(history);
                console.log('History loaded:');
                return;
            } else{
                const history = await chatApi.getHistorySession(currentSession);
                setMessages(history);
                console.log('History loaded:');
            }
        } catch (error) {
            console.error('Error loading history:', error);
        }
    };

    // clippy.load('Merlin', (agent) => {
    //     // do anything with the loaded agent
    //     agent.show();
    // });

    const handleSendMessage = async (content) => {
        if (!currentSession) return;
        setIsLoading(true);
        if (currentSession === 'Maths' || currentSession === 'Français' || currentSession === 'Histoire') {
            try {
                const response = await chatApi.sendTeacherMessage(content, currentSession);
                setMessages(prev => [
                    ...prev,
                    { role: 'user', content },
                    { role: 'assistant', content: response.response }
                ]);
            } catch (error) {
                console.error('Error sending message:', error);
            } finally {
                loadSessions();
                setIsLoading(false);
            }
        } else if (currentSession === 'RAG') {
            try {
                console.log('Sending RAG message:', content);
                const response = await chatApi.sendRagMessage(content, currentSession);
                setMessages(prev => [
                    ...prev,
                    { role: 'user', content },
                    { role: 'assistant', content: response.response }
                ]);
            } catch (error) {
                console.error('Error sending message:', error);
            } finally {
                loadSessions();
                setIsLoading(false);
            }
        } else {
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
                loadSessions();
                setIsLoading(false);
            }
        }
    };

    return (
        <div className="chat-page">
            <Header user={user} onLogout={onLogout} />
            <div className="chat-page__content">
                <Sidebar
                    agents={agents}
                    sessions={sessions}
                    currentSession={currentSession}
                    onSessionChange={setCurrentSession}
                />
                <div className="chat-page__chat-container">
                    <ChatWindow messages={messages} />
                    <MessageInput currentSession={currentSession} onSendMessage={handleSendMessage} isLoading={isLoading} />
                </div>
            </div>
        </div>
    );
}

export default ChatPage;
