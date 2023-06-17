import React from 'react';
import styles from './scaleY.module.scss';

export const ScaleY = () => {
    return (
        <div className={styles.scaleYWrapper}>
            <div className={styles.scaleY}>
                <div className={styles.timeScale}>
                    <div>1 ч 40 мин</div>
                    <div>1 ч 15 мин</div>
                    <div>50 мин</div>
                    <div>25 мин</div>
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
