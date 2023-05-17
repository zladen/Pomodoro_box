import i18n from "i18next";
import styles from "./locale.module.scss"
import { useState } from "react";

export const Locale = () => {
    const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);
    const changeLanguage = (language: string) => {
        i18n.changeLanguage(language);
        setSelectedLanguage(language);
    };    
    
    return (
        <select onChange={(e) => changeLanguage(e.target.value)} className={styles.timeZone} value={selectedLanguage}>
            <option value="en" key='en'>English</option>
            <option value="ru" key='en'>Русский</option>
        </select>
    );
};

export default Locale;