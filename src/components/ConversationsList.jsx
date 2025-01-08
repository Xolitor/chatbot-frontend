const ConversationsList = ({ sessions, currentSession, onSessionChange }) => {
    return (
        <div className="conversations-list">
            <h2 className="conversations-list__title">Conversations</h2>
            <div className="conversations-list__items">
                {sessions.map((session) => (
                    <button
                        key={session}
                        onClick={() => onSessionChange(session)}
                        className={`conversations-list__item ${
                            currentSession === session
                                ? 'conversations-list__item--active'
                                : ''
                        }`}
                    >
                        Session {session.slice(-6)}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ConversationsList;
