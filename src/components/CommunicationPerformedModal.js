import React, { useState } from 'react';

const CommunicationPerformedModal = ({ onClose, onSubmit }) => {
    const [type, setType] = useState('');
    const [date, setDate] = useState('');
    const [notes, setNotes] = useState('');
    const [nextType, setNextType] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (type && date && nextType) {
            onSubmit(type, date, notes, nextType);
            setType('');
            setDate('');
            setNotes('');
            setNextType('');
            onClose();
        } else {
            alert("Please fill in all fields.");
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h3>Log Communication</h3>
                <form onSubmit={handleSubmit}>
                    <label>
                        Type of Communication:
                        <select value={type} onChange={(e) => setType(e.target.value)} required>
                            <option value="">Select...</option>
                            <option value="LinkedIn Post">LinkedIn Post</option>
                            <option value="Email">Email</option>
                            <option value="Mobile Call">Mobile Call</option>
                            <option value="Other">Other</option>
                        </select>
                    </label>
                    <label>
                        Date of Communication:
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Add Notes:
                        <textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                        />
                    </label>
                    <label>
                        Next Scheduled Communication Type:
                        <select value={nextType} onChange={(e) => setNextType(e.target.value)} required>
                            <option value="">Select...</option>
                            <option value="LinkedIn Post">LinkedIn Post</option>
                            <option value="Email">Email</option>
                            <option value="Mobile Call">Mobile Call</option>
                            <option value="Other">Other</option>
                        </select>
                    </label>
                    <button type="submit">Submit</button>
                    <button type="button" onClick={onClose}>Cancel</button>
                </form>
            </div>
        </div>
    );
};

export default CommunicationPerformedModal;