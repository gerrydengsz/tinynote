import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { FormattedMessage, useIntl } from 'react-intl';
import config from '../config';

function NoteForm() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();
    const intl = useIntl();

    useEffect(() => {
        if (id) {
            fetchNote();
        }
    }, [id]);

    const fetchNote = async () => {
        try {
            const response = await axios.get(`${config.API_BASE_URL}/api/notes/${id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setTitle(response.data.title);
            setContent(response.data.content);
        } catch (error) {
            console.error('Failed to fetch note:', error);
            setError('error.network');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const noteData = { title, content };
            if (id) {
                await axios.put(`${config.API_BASE_URL}/api/notes/${id}`, noteData, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
            } else {
                await axios.post(`${config.API_BASE_URL}/api/notes`, noteData, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
            }
            navigate('/');
        } catch (error) {
            console.error('Failed to save note:', error);
            setError('error.network');
        }
    };

    return (
        <div className="note-form">
            <h2>
                <FormattedMessage id={id ? 'note.edit' : 'note.new'} />
            </h2>
            {error && <div className="error-message"><FormattedMessage id={error} /></div>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder={intl.formatMessage({ id: 'note.title.placeholder' })}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <textarea
                    placeholder={intl.formatMessage({ id: 'note.content.placeholder' })}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />
                <div className="button-group">
                    <button type="submit">
                        <FormattedMessage id={id ? 'note.update' : 'note.save'} />
                    </button>
                    <button type="button" onClick={() => navigate('/')}>
                        <FormattedMessage id="note.cancel" />
                    </button>
                </div>
            </form>
        </div>
    );
}

export default NoteForm; 