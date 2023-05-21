import { createContext, useEffect, useState } from 'react'
import styles from './application.module.scss'
import { TimeZone } from './TimeZone/TimeZone'
import { I18nextProvider, useTranslation } from 'react-i18next';
import i18n from '../../../i18n';
import { Theme } from '../Theme/Theme';
import { useTheme } from '../../../hooks/useTheme';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/reducers/themeSlice';

type ThemeContextType = {
    theme: string;
    toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType | null>(null);

export const Application = () => {
    const { t } = useTranslation();
    const theme = useSelector((state: RootState) => state.theme.theme)
    const labelTheme = () => {
        if (theme === 'dark') {
            return t('light_theme');
        } else {
            return t('dark_theme');
        }
    };

    
    return (
        <I18nextProvider i18n={i18n}>
            <div className={styles.application} >
                <div className={styles.soundsAlert}>
                    <div className={styles.theme}>
                        <label>{labelTheme()}</label>
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
