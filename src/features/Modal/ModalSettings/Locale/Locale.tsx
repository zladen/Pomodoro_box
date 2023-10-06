import i18n from "i18next";
import styles from "./locale.module.scss"
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/reducers/configSlice";
import { useSystemNotify } from "../../../../hooks/useSystemNotify";
import { useTranslation } from "react-i18next";

export const Locale = () => {
    const { t } = useTranslation();
    const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);
    const { notify } = useSelector((state: RootState) => state.config);
    const { systemNotify } = useSystemNotify();

    const changeLanguage = (language: string) => {
        i18n.changeLanguage(language);
        setSelectedLanguage(language);
        if (notify) {
            systemNotify(t("setting_saved"));
        }
    };

    return (
        <select 
            onChange={(e) => changeLanguage(e.target.value)} 
            className={styles.timeZone} 
            value={selectedLanguage}>
            <option value="en-EN" key='en'>English</option>
            <option value="ru-RU" key='ru'>Русский</option>
        </select>
    );
};

export default Locale;