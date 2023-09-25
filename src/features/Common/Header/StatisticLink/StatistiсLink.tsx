import { Link } from 'react-router-dom';
import { EIcons, Icons } from '../../../../ui/Icons/Icons';
import styles from './StatisticLink.module.scss'
import { useTranslation } from 'react-i18next';

export const StatisticsLink = () => {
    const { t } = useTranslation();
    return (
        <Link to="/statistics">
            <div className={styles.statisticsLink}>
                <Icons name={EIcons.statistics} />
                <span className={styles.statisticsLinkText}>{t("statistics")}</span>
            </div>
        </Link>
    );  
}