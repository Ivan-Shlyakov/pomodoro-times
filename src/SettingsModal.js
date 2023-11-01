// SettingsModal.js
import React, { useState } from 'react';
import './SettingsModal.css';

const SettingsModal = ({ onClose, onSaveSettings }) => {
    const [pomodoroTime, setPomodoroTime] = useState(25);
    const [shortBreakTime, setShortBreakTime] = useState(5);
    const [longBreakTime, setLongBreakTime] = useState(15);

    const handleSaveClick = () => {
        onSaveSettings({
            pomodoroTime: pomodoroTime * 60,
            shortBreakTime: shortBreakTime * 60,
            longBreakTime: longBreakTime * 60,
        });
        onClose();
    };

    return (
        <div className="settings-modal">
            <div className="settings-content">
                <h2>Настройки</h2>
                <label>
                    Pomodoro (минуты):
                    <input type="number" value={pomodoroTime} onChange={(e) => setPomodoroTime(e.target.value)} />
                </label>
                <label>
                    Short Break (минуты):
                    <input type="number" value={shortBreakTime} onChange={(e) => setShortBreakTime(e.target.value)} />
                </label>
                <label>
                    Long Break (минуты):
                    <input type="number" value={longBreakTime} onChange={(e) => setLongBreakTime(e.target.value)} />
                </label>
                <div className="settings-buttons">
                    <button className="save-btn" onClick={handleSaveClick}>Сохранить</button>
                    <button className="cancel-btn" onClick={onClose}>Отмена</button>
                </div>
            </div>
        </div>
    );
};

export default SettingsModal;
