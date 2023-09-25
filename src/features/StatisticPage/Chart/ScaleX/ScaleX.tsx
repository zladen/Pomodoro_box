import styles from './scaleX.module.scss'
import classNames from 'classnames';
import { IBar } from '../Bar/Bar';
import { useTranslation } from 'react-i18next';
import { daysOfWeek } from '../../../../constants';

export const ScaleX = ({ activeBar, onClick }: IBar) => {
    const { t } = useTranslation();
    return (
        <div className={styles.scaleXWrapper}>
            <div className={styles.scaleX}>
                {daysOfWeek.map((day) => (
                    <div 
                        key={day}
                        id={day}
                        className={classNames(styles.scaleDays, { [styles.activeClass]: activeBar === day })}
                        onClick={onClick}
                    >
                        {t(day)}
                    </div>
                ))}
            </div>
        </div>
    );
}
