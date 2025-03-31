import axios from 'axios';

const API_URL = 'http://localhost:8000';

export const chatApi = {
    sendMessage: async (message, sessionId) => {
        const response = await axios.post(`${API_URL}/smart/smart`, {
            message,
            session_id: sessionId
        });
        return response.data;
    },

    sendRagMessage: async (message, sessionId) => {
        const ragSessionId = `rag_${sessionId}`;
        const response = await axios.post(`${API_URL}/smart/smartt`, {
            message,
            session_id: ragSessionId,
            use_rag: true
        });
        return response.data;
    },

    sendRagUpload: async (files) => {
        const response = await axios.post(`${API_URL}/smart/smart`, files);
        return response.data;
    },

    sendTeacherMessage: async (message, sessionId) => {
        let teacher_id;
        switch (sessionId) {
            case 'Maths':
                teacher_id = 'maths_teacher';
                break;
            case 'Histoire':
                teacher_id = 'histoire_teacher';
                break;
            case 'Français':
                teacher_id = 'francais_teacher';
                break;
            // case 'RAG':
            //     teacher_id = 'rag_teacher';
                break;
            default:
                teacher_id = 'default_teacher';
        }
        const teacherSessionId = `teacher_${teacher_id}_${sessionId}`;
        // const response = await axios.post(`${API_URL}/teacher/${teacher_id}/chat`, {
        const response = await axios.post(`${API_URL}/chat/chat`, {
            teacher_id,
            message,
            session_id: teacherSessionId
        });
        return response.data;
    },

    getHistorySession: async (sessionId) => {
        const response = await axios.get(`${API_URL}/chat/history/${sessionId}`);
        return response.data;
    },

    // getHistoryTeacher: async (sessionId) => {
    //     const response = await axios.get(`${API_URL}/teacher/history/${sessionId}`);
    //     return response.data;
    // },

    getHistoryTeacher: async (sessionId) => {
        let teacher_id;
        switch (sessionId) {
            case 'Maths':
                teacher_id = 'maths_teacher';
                break;
            case 'Histoire':
                teacher_id = 'histoire_teacher';
                break;
            case 'Français':
                teacher_id = 'francais_teacher';
                break;
            // case 'RAG':
            //     // Pour RAG, utiliser la méthode d'historique avec le préfixe RAG
            //     return chatApi.getHistorySession(`rag_${sessionId}`);
            default:
                teacher_id = 'default_teacher';
        }
        
        // Utiliser le même format d'ID de session que dans sendTeacherMessage
        const teacherSessionId = `teacher_${teacher_id}_${sessionId}`;
        return chatApi.getHistorySession(teacherSessionId);
    },

    getAllSessions: async () => {
        const response = await axios.get(`${API_URL}/chat/sessions`);
        return response.data;
    }
};
