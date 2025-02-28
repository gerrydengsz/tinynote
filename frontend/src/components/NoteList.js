import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FormattedMessage } from 'react-intl';
import config from '../config';

function NoteList() {
    const [notes, setNotes] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = async () => {
        try {
            const response = await axios.get(`${config.API_BASE_URL}/api/notes`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setNotes(response.data);
        } catch (error) {
            console.error('Failed to fetch notes:', error);
            setError('error.network');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm(<FormattedMessage id="note.delete.confirm" />)) {
            try {
                await axios.delete(`${config.API_BASE_URL}/api/notes/${id}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                setNotes(notes.filter(note => note.id !== id));
            } catch (error) {
                console.error('Failed to delete note:', error);
                setError('error.network');
            }
        }
    };

    return (
        <div className="note-list">
            <h2><FormattedMessage id="note.list.title" /></h2>
            {error && <div className="error-message"><FormattedMessage id={error} /></div>}
            <Link to="/new-note" className="add-note-button">
                <FormattedMessage id="note.add.new" />
            </Link>
            <div className="notes-grid">
                {notes.length === 0 ? (
                    <p><FormattedMessage id="note.empty" /></p>
                ) : notes.map(note => (
                    <div key={note.id} className="note-card">
                        <Link to={`/edit-note/${note.id}`} className="note-title">
                            {note.title}
                        </Link>
                        <button onClick={() => handleDelete(note.id)} className="delete-button">
                            <FormattedMessage id="note.delete" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default NoteList; 