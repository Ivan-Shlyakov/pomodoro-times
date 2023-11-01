import React, { useState, useEffect } from 'react';
import Header from './Header';
import TaskForm from './TaskForm';
import LoginModal from './LoginModal';
import SettingsModal from './SettingsModal'; // Импортируйте компонент SettingsModal
import './App.css';
import './style.css';
import './SettingsModal.css'; // Импортируйте стили SettingsModal.css

const App = ({ isLoggedIn }) => {
    const [seconds, setSeconds] = useState(25 * 60);
    const [isActive, setIsActive] = useState(false);
    const [breakTypes, setBreakTypes] = useState([
        { name: 'Pomodoro', duration: 25 * 60 },
        { name: 'Short Break', duration: 5 * 60 },
        { name: 'Long Break', duration: 15 * 60 },
    ]);
    const [currentBreakIndex, setCurrentBreakIndex] = useState(0);
    const [tasks, setTasks] = useState([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false); // Состояние для открытия/закрытия модального окна настроек
    const [pomodoroTime, setPomodoroTime] = useState(25 * 60);
    const [shortBreakTime, setShortBreakTime] = useState(5 * 60);
    const [longBreakTime, setLongBreakTime] = useState(15 * 60);
    const [currentTimer, setCurrentTimer] = useState(25 * 60);

    const currentBreak = breakTypes[currentBreakIndex];

    const handleSettingsClick = () => {
        setIsSettingsModalOpen(true);
    };

    const handleSaveSettings = ({ pomodoroTime, shortBreakTime, longBreakTime }) => {
        setCurrentTimer(pomodoroTime); // Сохраняем продолжительность текущего таймера
        setPomodoroTime(pomodoroTime);
        setShortBreakTime(shortBreakTime);
        setLongBreakTime(longBreakTime);
        setIsSettingsModalOpen(false);
        setSeconds(pomodoroTime); // Устанавливаем секунды в таймере равными выбранному времени Помодоро
    };

    useEffect(() => {
        if (!isActive) {
            setSeconds(currentTimer);
        }
    }, [currentTimer, isActive]);

    useEffect(() => {
        const savedTasks = localStorage.getItem('tasks');
        if (savedTasks) {
            setTasks(JSON.parse(savedTasks));
        }
    }, []);

    useEffect(() => {
        document.body.style.backgroundColor = currentBreak.name === 'Pomodoro' ? 'rgb(186, 73, 73)' : currentBreak.name === 'Short Break' ? 'rgb(56, 133, 138)' : 'rgb(57, 112, 151)';
        const rootElement = document.getElementById('root');
        rootElement.style.backgroundColor = currentBreak.name === 'Pomodoro' ? 'rgb(186, 73, 73)' : currentBreak.name === 'Short Break' ? 'rgb(56, 133, 138)' : 'rgb(57, 112, 151)';
    }, [currentBreak]);

    useEffect(() => {
        let interval;
        if (isActive && seconds > 0) {
            interval = setInterval(() => {
                setSeconds(seconds => seconds - 1);
            }, 1000);
        } else if (seconds === 0) {
            setIsActive(false);
            if (currentBreakIndex === breakTypes.length - 1) {
                setCurrentBreakIndex(0);
            } else {
                setCurrentBreakIndex(currentBreakIndex + 1);
            }
            setSeconds(breakTypes[currentBreakIndex].duration);
        }

        return () => clearInterval(interval);
    }, [isActive, seconds, currentBreakIndex, breakTypes]);

    const handleTaskAdd = (newTask) => {
        setTasks([...tasks, newTask]);
        setIsFormOpen(false);
        localStorage.setItem('tasks', JSON.stringify([...tasks, newTask]));
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Header onLoginClick={() => setIsLoginModalOpen(true)} onSettingsClick={handleSettingsClick} isLoggedIn={isLoggedIn} />
            <div style={{ width: '480px', margin: '40px auto 0' }}>
                <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', padding: '20px 0px 30px', borderRadius: '6px', marginBottom: '20px', width: '100%' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
                        <div>
                            {breakTypes.map((breakType, index) => (
                                <button
                                    key={index}
                                    onClick={() => {
                                        setCurrentBreakIndex(index);
                                        setSeconds(breakType.duration);
                                    }}
                                    className={currentBreakIndex === index ? 'active-timer-button' : 'inactive-timer-button'}
                                >
                                    {breakType.name}
                                </button>
                            ))}
                        </div>
                        <p style={{ fontSize: '120px', fontWeight: 'bold', marginTop: '20px', marginBottom: '0' }}>{Math.floor(seconds / 60)}:{seconds % 60 < 10 ? `0${seconds % 60}` : seconds % 60}</p>
                        <button
                            onClick={() => setIsActive(!isActive)}
                            disabled={isLoginModalOpen}
                            style={{
                                cursor: 'pointer',
                                border: 'none',
                                margin: '20px 0px 0px',
                                padding: '0px 12px',
                                borderRadius: '4px',
                                boxShadow: 'rgb(235, 235, 235) 0px 6px 0px',
                                fontFamily: 'ArialRounded',
                                fontSize: '22px',
                                height: '55px',
                                color: 'rgb(186, 73, 73)',
                                fontWeight: 'bold',
                                width: '200px',
                                backgroundColor: 'white',
                                transition: 'color 0.5s ease-in-out 0s',
                            }}
                        >
                            {isActive ? 'Pause' : 'Start'}
                        </button>
                    </div>
                </div>
            </div>
            <div className="add-task-button" onClick={() => setIsFormOpen(true)}>
                Add Task
            </div>
            {isFormOpen && <TaskForm onTaskAdd={handleTaskAdd} onCancel={() => setIsFormOpen(false)} />}
            <ul>
                {tasks && tasks.map((task, index) => (
                    task && <li key={index}>{task.name} - {task.pomodoros} pomodoros</li>
                ))}
            </ul>
            {isLoginModalOpen && <LoginModal onClose={() => setIsLoginModalOpen(false)} />}
            {isSettingsModalOpen && <SettingsModal onClose={() => setIsSettingsModalOpen(false)} onSaveSettings={handleSaveSettings} />}
        </div>
    );
};

export default App;
