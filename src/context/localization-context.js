import {createContext, useEffect, useState} from "react";
import localization from '../shared/localization/localization';

export const LocalizationContext = createContext({
    language: 'en'
})

export const LocalizationProvider = ({children}) => {
    const initialLocale = localStorage.getItem('language') || 'en';

    const [locale, setLocale] = useState(localization[initialLocale]);
    const [language, setLanguage] = useState(initialLocale);

    useEffect(() => {
        localStorage.setItem('language', language);
        setLocale(localization[language]);
    }, [language])

    return <LocalizationContext.Provider value={{locale, language, setLanguage}}>
        {children}
    </LocalizationContext.Provider>
}

export default LocalizationContext;
