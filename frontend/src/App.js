import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import { IntlProvider, FormattedMessage, useIntl } from 'react-intl';
import { LanguageProvider, LanguageContext } from './contexts/LanguageContext';
import Login from './components/Login';
import Register from './components/Register';
import NoteList from './components/NoteList';
import NoteForm from './components/NoteForm';
import zh_CN from './locales/zh_CN';
import en_US from './locales/en_US';
import './App.css';

const messages = {
    'zh-CN': zh_CN,
    'en-US': en_US
};

function LanguageSelectorIntl() {
    const { locale, changeLanguage } = React.useContext(LanguageContext);
    const intl = useIntl();
    
    useEffect(() => {
        document.title = intl.formatMessage({ id: 'app.title' });
    }, [locale, intl]);

    return (
        <select 
            value={locale.replace('-', '_')} 
            onChange={(e) => changeLanguage(e.target.value)}
            className="language-selector"
        >
            <option value="zh_CN">中文</option>
            <option value="en_US">English</option>
        </select>
    );
}

function AppContent() {
    const [isAuthenticated, setIsAuthenticated] = useState(
        !!localStorage.getItem('token')
    );
    const { locale } = React.useContext(LanguageContext);

    const handleLogin = () => {
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
    };

    return (
        <IntlProvider messages={messages[locale]} locale={locale}>
            <Router>
                <div className="App">
                    <nav>
                        <LanguageSelectorIntl />
                        {isAuthenticated ? (
                            <>
                                <Link to="/"><FormattedMessage id="nav.noteList" /></Link>
                                <button onClick={handleLogout}>
                                    <FormattedMessage id="nav.logout" />
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login"><FormattedMessage id="nav.login" /></Link>
                                <Link to="/register"><FormattedMessage id="nav.register" /></Link>
                            </>
                        )}
                    </nav>

                    <Routes>
                        <Route path="/login" element={
                            !isAuthenticated ? <Login onLogin={handleLogin} /> : <Navigate to="/" />
                        } />
                        <Route path="/register" element={
                            !isAuthenticated ? <Register /> : <Navigate to="/" />
                        } />
                        <Route path="/" element={
                            isAuthenticated ? <NoteList /> : <Navigate to="/login" />
                        } />
                        <Route path="/new-note" element={
                            isAuthenticated ? <NoteForm /> : <Navigate to="/login" />
                        } />
                        <Route path="/edit-note/:id" element={
                            isAuthenticated ? <NoteForm /> : <Navigate to="/login" />
                        } />
                    </Routes>
                </div>
            </Router>
        </IntlProvider>
    );
}

function App() {
    return (
        <LanguageProvider>
            <AppContent />
        </LanguageProvider>
    );
}

export default App; 