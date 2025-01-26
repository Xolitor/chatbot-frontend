import React, { useState } from 'react';

function MessageInput({ onSendMessage, isLoading }) {
    const [inputValue, setInputValue] = useState(''); // État pour gérer l'entrée utilisateur

    const handleChange = (e) => {
        setInputValue(e.target.value); // Met à jour l'état avec la valeur du champ d'entrée
    };

    const handleSendMessage = () => {
        if (inputValue.trim() === '') return; // Ne pas envoyer de message vide
        onSendMessage(inputValue); // Appeler la fonction parent avec le message
        setInputValue(''); // Réinitialiser le champ d'entrée
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    return (
        <div className="message-input">
            <div className="input-field">
                <input
                    type="text"
                    placeholder="Tapez votre message ici..."
                    value={inputValue} // Liaison avec l'état
                    onChange={handleChange} // Gestion des modifications de l'entrée
                    onKeyPress={handleKeyPress} // Gestion de l'appui sur la touche Entrée
                    disabled={isLoading} // Désactiver le champ si un message est en cours d'envoi
                />
            </div>
            <button
                className="send-button"
                onClick={handleSendMessage} // Gestion de l'envoi du message
                disabled={isLoading || inputValue.trim() === ''} // Désactiver si vide ou en cours de chargement
            >
                {isLoading ? 'Envoi...' : 'Envoyer'}
            </button>
        </div>
    );
}

export default MessageInput;
