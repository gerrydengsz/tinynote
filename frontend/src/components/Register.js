import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FormattedMessage, useIntl } from 'react-intl';
import config from '../config';

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const intl = useIntl();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${config.API_BASE_URL}/api/auth/register`, {
                username,
                password,
                email
            });
            // 注册成功后跳转到登录页
            navigate('/login');
        } catch (error) {
            console.error('Registration failed:', error);
            if (error.response) {
                setError(error.response.data || 'register.error');
            } else {
                setError('error.network');
            }
        }
    };

    return (
        <div>
            <h2><FormattedMessage id="register.title" /></h2>
            {error && <div className="error-message"><FormattedMessage id={error} /></div>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder={intl.formatMessage({ id: 'register.username' })}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder={intl.formatMessage({ id: 'register.password' })}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder={intl.formatMessage({ id: 'register.email' })}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit">
                    <FormattedMessage id="register.submit" />
                </button>
            </form>
        </div>
    );
}

export default Register; 