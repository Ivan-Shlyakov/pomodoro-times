import React, { useState } from 'react';
import './Header.css';
import logoImage from './images/icon-white2.png';
import reportIcon from './images/graph-white.png';
import settingIcon from './images/config-white.png';
import loginIcon from './images/user-white.png';
import LoginModal from './LoginModal'; // Импорт компонента LoginModal

const Header = ({ isLoggedIn, onLoginClick, onSettingsClick }) => {
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

    const handleLoginClick = () => {
        setIsLoginModalOpen(true);
    };

    const closeLoginModal = () => {
        setIsLoginModalOpen(false);
    };

    return (
        <div className="header">
            <div className="logo">
                <img src={logoImage} alt="Logo" />
                Pomodoro App
            </div>
            <div className="buttons">
                <button>
                    <img src={reportIcon} alt="Report" />
                    Report
                </button>
                <button onClick={onSettingsClick}>
                    <img src={settingIcon} alt="Setting" />
                    Setting
                </button>
                {!isLoggedIn && (
                    <button onClick={onLoginClick}>
                        <img src={loginIcon} alt="Login" />
                        Login
                    </button>
                )}
            </div>
            {isLoginModalOpen && <LoginModal onClose={closeLoginModal} onLogin={onLoginClick} />}
        </div>
    );
};

export default Header;
