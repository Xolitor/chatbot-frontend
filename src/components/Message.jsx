// const Message = ({ message, isUser }) => {
//     return (
//         <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
//             <div
//                 className={`rounded-lg px-4 py-2 max-w-[70%] ${
//                     isUser
//                         ? 'bg-blue-500 text-white'
//                         : 'bg-gray-100 text-gray-800'
//                 }`}
//             >
//                 {message.content}
//             </div>
//         </div>
//     );
// };
// export default Message;

import React from 'react';
import ReactMarkdown from 'react-markdown';

function Message({ role, content, metadata }) {
    // Helper functions for special message types
    const renderExerciseControls = (metadata) => {
        if (!metadata || metadata.type !== 'exercise') return null;
        
        return (
            <div className="message-controls">
                <button 
                    className="view-exercise-btn" 
                    onClick={() => navigator.clipboard.writeText(metadata.exercise_id)}
                >
                    Copy Exercise ID
                </button>
            </div>
        );
    };
    
    const renderEvaluationControls = (metadata) => {
        if (!metadata || metadata.type !== 'evaluation') return null;
        
        return (
            <div className="message-controls">
                <span className="evaluation-tag">Evaluation</span>
            </div>
        );
    };
    
    const renderHintControls = (metadata) => {
        if (!metadata || metadata.type !== 'hint') return null;
        
        return (
            <div className="message-controls">
                <span className="hint-tag">Hint</span>
            </div>
        );
    };
    
    const renderSolutionControls = (metadata) => {
        if (!metadata || metadata.type !== 'solution') return null;
        
        return (
            <div className="message-controls">
                <span className="solution-tag">Solution</span>
            </div>
        );
    };
    
    // Determine message type based on metadata
    const getMessageType = () => {
        if (!metadata) return 'default';
        return metadata.type || 'default';
    };
    
    const messageType = getMessageType();

    return (
        <div className={`message ${role} ${messageType}`}>
            <div className="message-header">
                <span className="role">{role === 'user' ? 'You' : 'Assistant'}</span>
            </div>
            <div className="message-content">
                <ReactMarkdown>{content}</ReactMarkdown>
            </div>
            
            {/* Render special controls based on message type */}
            {messageType === 'exercise' && renderExerciseControls(metadata)}
            {messageType === 'evaluation' && renderEvaluationControls(metadata)}
            {messageType === 'hint' && renderHintControls(metadata)}
            {messageType === 'solution' && renderSolutionControls(metadata)}
        </div>
    );
}

export default Message;