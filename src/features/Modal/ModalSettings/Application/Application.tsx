import { createContext, useEffect, useState } from 'react'
import styles from './application.module.scss'
import { TimeZone } from './TimeZone/TimeZone'
import { I18nextProvider, useTranslation } from 'react-i18next';
import i18n from '../../../../lib/i18n';
import { Theme } from '../Application/Theme/Theme';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/reducers/configSlice';

export const Application = () => {
    const { t } = useTranslation();
    const theme = useSelector((state: RootState) => state.config.theme)
    const labelTheme = () => {
        if (theme === 'dark') {
            return t('light_theme');
        } else {
            return t('dark_theme');
        }
    };

    return (
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
    )
}
