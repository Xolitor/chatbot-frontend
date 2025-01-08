import React from 'react';
import ConversationsList from './ConversationsList';

function Sidebar({ sessions, currentSession, onSessionChange }) {
    return (
        <div className="sidebar">

            {/* Liste des agents */}
            <div className="sidebar__section sidebar__section">
                <h2 className="sidebar__title">Agents</h2>
                <ul className="sidebar__list">
                    <li className="sidebar__item sidebar__item--agent">Maths</li>
                    <li className="sidebar__item sidebar__item--agent">Français</li>
                    <li className="sidebar__item sidebar__item--agent">Histoire</li>
                </ul>
            </div>
            {/* Liste des conversations */}
            <div className="sidebar__section">
                <ConversationsList
                    sessions={sessions}
                    currentSession={currentSession}
                    onSessionChange={onSessionChange}
                />
            </div>
        </div>
    );
}

export default Sidebar;
