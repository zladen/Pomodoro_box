import { I18nextProvider, useTranslation } from 'react-i18next';
import i18n from '../../../../../lib/i18n';

import styles from './cardWorkTime.module.scss'

export interface CardWorkTimeProps {
    title?: string;
    className?: string;
    value?: string | number;
}

export function CardWorkTime({title, className, value}: CardWorkTimeProps) {
    const { t } = useTranslation();

    return ( 
        <I18nextProvider i18n={i18n}>
            <div className={className}>
                <div className={styles.titleWorkTime}>{title}</div>
                {value ? (
                    <div className={styles.descrWorkTime}>
                        {t("working_on_tasks")}
                        <span className={styles.WorkTime}> {value}</span>
                    </div>
                ) : (
                    <div className={styles.descrWorkTime}>
                        {t("no_data")}
                    </div>
                )}
            </div>
        </I18nextProvider>
    )
}