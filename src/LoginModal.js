import React, { useState } from 'react';
import './LoginModal.css';

const LoginModal = ({ onClose, onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Проверка имени пользователя и пароля (можно заменить на API-запрос)
        if (username === 'user' && password === 'password') {
            localStorage.setItem('isLoggedIn', 'true');
            onLogin();
            onClose();
        } else {
            alert('Неверное имя пользователя или пароль.');
        }
    };

    return (
        <div className="login-modal-overlay">
            <div className="overlay"></div>
            <div className="login-modal-content">
                <h2>Login</h2>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={handleLogin}>Login</button>
                <button className="close-button" onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default LoginModal;