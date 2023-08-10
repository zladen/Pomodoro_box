import styles from './scaleY.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/reducers/configSlice';
import { useTranslation } from 'react-i18next';

export const ScaleY = () => {
    const { t } = useTranslation();
    const { pomodoro } = useSelector((state: RootState) => state.config);

    const totalTaskTime = (multiplier: number) => {
        let hours = Math.floor( ((pomodoro * multiplier) / 60) / 60 );
        let minutes = Math.floor( ((pomodoro * multiplier) / 60) % 60 );
        let result = "";
        if (hours == 1 || hours == 21) {
            result+= `${hours} ${t("h")}`
        } else if (hours > 1 
            && hours <= 4 
            || hours >=  22 
            && hours <= 24) {
            result+= `${hours} ${t("h")}` 
        } else if (hours && hours >= 5) {
            result+= `${hours} ${t("h")}` 
        }

        if (minutes 
            && minutes == 1 
            || minutes == 21 
            || minutes == 31 
            || minutes == 41 
            || minutes == 51) {
            result+= ` ${minutes} ${t("min")}` 
        } else if (minutes && minutes > 1 
            && minutes <= 4 || minutes >=  22 
            && minutes <= 24 || minutes >=  32 
            && minutes <= 34 || minutes >=  42 
            && minutes <= 44 || minutes >=  52 
            && minutes <= 54) {
            result+= ` ${minutes} ${t("min")}` 
        } else if (minutes && minutes >= 5) {
            result+= ` ${minutes} ${t("min")}` 
        }

        return result;
    }

    return (
        <div className={styles.scaleYWrapper}>
            <div className={styles.scaleY}>
                <div className={styles.timeScale}>
                    <div>{totalTaskTime(4)}</div>
                    <div>{totalTaskTime(3)}</div>
                    <div>{totalTaskTime(2)}</div>
                    <div>{totalTaskTime(1)}</div>
                </div>
            </div>
            <div className={styles.lineScaleY}>
                <div className={styles.line}></div>
                <div className={styles.line}></div>
                <div className={styles.line}></div>
                <div className={styles.line}></div>
            </div>
        </div>
    )
}
