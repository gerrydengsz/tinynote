import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [locale, setLocale] = useState(localStorage.getItem('locale') || 'zh-CN');

    const changeLanguage = (newLocale) => {
        // 将 zh_CN 转换为 zh-CN 格式
        const formattedLocale = newLocale.replace('_', '-');
        localStorage.setItem('locale', formattedLocale);
        setLocale(formattedLocale);
        axios.defaults.headers.common['Accept-Language'] = formattedLocale;
    };

    useEffect(() => {
        const savedLocale = localStorage.getItem('locale') || 'zh-CN';
        setLocale(savedLocale);
        axios.defaults.headers.common['Accept-Language'] = savedLocale;
    }, []);

    return (
        <LanguageContext.Provider value={{ locale, changeLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
}; 