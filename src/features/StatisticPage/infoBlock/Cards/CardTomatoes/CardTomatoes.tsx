import { I18nextProvider, useTranslation } from 'react-i18next';
import i18n from '../../../../../lib/i18n';
import styles from './cardTomatoes.module.scss'
import { EIcons, Icons } from '../../../../../ui/Icons';

export interface CardTomatoesProps {
    data?: string;
    icon?: React.ReactNode;
    title?: string;
    className?: string;
    value?: string | number;
}

//Решить вопрос с окончанием помидора, помидоров.

export function CardTomatoes({className, value}: CardTomatoesProps) {
    const { t } = useTranslation();
    return ( 
        <I18nextProvider i18n={i18n}>
            <div className={className}>
                {value ? (
                    <div className={styles.cardTomatoesData}>
                        <div className={styles.cardTomatoesDataIcon}>
                            <Icons name={EIcons.tomatoes}/>
                            <span className={styles.cardTomatoesDataValue}>
                                x {value}
                            </span>
                        </div>
                        <div className={styles.cardTomatoesDescr}>
                            <div className={styles.cardTomatoesText}>
                                {value} Помидора
                            </div>
                        </div> 
                    </div>
                ) : (
                    <div className={styles.descrWorkTime}>
                        <Icons name={EIcons.tomato}/>
                    </div>
                )}
            </div>
        </I18nextProvider>
    )
}