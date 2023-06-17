import React, { useState } from 'react';
import styles from './bar.module.scss';

export const Bar = () => {

    const [activeClass, setActiveClass] = useState(null);

    const activeBar = (event: React.MouseEvent<HTMLDivElement>) => {
        console.log('click: ', event.currentTarget.id);
    }

    return (
        <div className={styles.bar}>
            <div className={styles.barWrapper}>
                <div id='mon' onClick={activeBar} className={styles.column}></div>
                <div id='tue' onClick={activeBar} className={styles.column}></div>
                <div id='ved' onClick={activeBar} className={styles.column}></div>
                <div id='thu' onClick={activeBar} className={styles.column}></div>
                <div id='fri' onClick={activeBar} className={styles.column}></div>
                <div id='sat' onClick={activeBar} className={styles.column}></div>
                <div id='sun' onClick={activeBar} className={styles.column}></div>
            </div>
        </div>
    )
}
