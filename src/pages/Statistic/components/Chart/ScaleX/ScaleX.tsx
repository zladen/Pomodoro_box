import React from 'react';
import styles from './scaleX.module.scss'

export const ScaleX = () => {
    return (
        <div className={styles.scaleXWrapper}>
            <div className={styles.scaleX}>
                <div className={styles.scaleDays}>Пн</div>
                <div className={styles.scaleDays}>Вт</div>
                <div className={styles.scaleDays}>Ср</div>
                <div className={styles.scaleDays}>Чт</div>
                <div className={styles.scaleDays}>Пт</div>
                <div className={styles.scaleDays}>Сб</div>
                <div className={styles.scaleDays}>Вс</div>
            </div>
        </div>
    )
}
