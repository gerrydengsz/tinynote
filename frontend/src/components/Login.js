import React, { useState } from 'react';
import axios from 'axios';
import { FormattedMessage, useIntl } from 'react-intl';
import config from '../config';

function Login({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const intl = useIntl();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${config.API_BASE_URL}/api/auth/login`, {
                username,
                password
            });
            localStorage.setItem('token', response.data.token);
            onLogin();
        } catch (error) {
            console.error('Login failed:', error);
            setError('login.error');
        }
    };

    return (
        <div>
            <h2><FormattedMessage id="login.title" /></h2>
            {error && <div className="error-message"><FormattedMessage id={error} /></div>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder={intl.formatMessage({ id: 'login.username' })}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder={intl.formatMessage({ id: 'login.password' })}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">
                    <FormattedMessage id="login.submit" />
                </button>
            </form>
        </div>
    );
}

export default Login; 