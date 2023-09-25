import styles from './cardTomatoes.module.scss'
import { EIcons, Icons } from '../../../../../ui/Icons';
import { universalFormatter } from '../../../../../utils/helpers/universalFormatter';
import { useTranslation } from 'react-i18next';

export interface CardTomatoesProps {
    data?: string;
    icon?: React.ReactNode;
    title?: string;
    className?: string;
    value?: number;
}

export function CardTomatoes({className, value}: CardTomatoesProps) {
    const { t } = useTranslation();

    return ( 
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
                            {value !== undefined ? universalFormatter(value, 'tomatoMade', t) : null}
                        </div>
                    </div> 
                </div>
            ) : (
                <div className={styles.descrWorkTime}>
                    <Icons name={EIcons.tomato}/>
                </div>
            )}
        </div>
    )
}