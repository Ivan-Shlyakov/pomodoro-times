import React, { useState } from 'react';
import './TaskForm.css';

const TaskForm = ({ onTaskAdd, onCancel }) => {
    const [taskName, setTaskName] = useState('');
    const [pomodoros, setPomodoros] = useState(1);
    const [notes, setNotes] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const newTask = {
            name: taskName,
            pomodoros,
            notes,
        };
        onTaskAdd(newTask);
        setTaskName('');
        setPomodoros(1);
        setNotes('');
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <label>
                    Task Name:
                    <input
                        type="text"
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)}
                        required
                        placeholder="What are you working on?"
                        className="form-input"
                    />
                </label>
                <label className="form-label">
                    Est Pomodoros:
                    <div className="pomodoro-input-container">
                        <button
                            className="arrow-button"
                            onClick={() => setPomodoros(Math.max(1, pomodoros - 1))}
                        >
                            -
                        </button>
                        <input
                            type="number"
                            value={pomodoros}
                            onChange={(e) => setPomodoros(parseInt(e.target.value, 10))}
                            required
                            className="pomodoro-input"
                        />
                        <button
                            className="arrow-button"
                            onClick={() => setPomodoros(pomodoros + 1)}
                        >
                            +
                        </button>
                    </div>
                </label>
                <label>
          <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Some notes..."
              className="form-textarea"
          />
                </label>
                <button type="button" className="cancel-button" onClick={onCancel}>
                    Cancel
                </button>
                <button type="submit" className="save-button">
                    Save
                </button>
            </form>
        </div>
    );
};

export default TaskForm;
