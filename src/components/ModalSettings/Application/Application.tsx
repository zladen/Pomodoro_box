import React, { createContext, useState } from 'react'
import styles from './application.module.scss'
import Toggle from '../../Toggle/Toggle'
import { TimeZone } from './TimeZone/TimeZone'
import { I18nextProvider, useTranslation } from 'react-i18next';
import i18n from '../../../i18n';
import DarkMode, { Theme } from '../Theme/Theme';

type ThemeContextType = {
    theme: string;
    toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType | null>(null);

export const Application = () => {
    const { t } = useTranslation();
    const [theme, setTheme] = useState('dark')

    const toggleTheme = () => {
        setTheme((curr) => (curr === 'ligth' ? 'dark': 'light'));
    };

    const logState = (state: boolean) => {
        console.log("Toggled:", state)
    }

    return (
        <I18nextProvider i18n={i18n}>
            <div className={styles.application} id={theme}>
                <div className={styles.soundsAlert}>
                    <div className={styles.theme}>
                        <label>{t("dark_theme")}</label>
                        <Theme />
                    </div>
                    <div className={styles.locale}> 
                        <TimeZone />
                    </div>
                </div>
            </div>
        </I18nextProvider>
    )
}
