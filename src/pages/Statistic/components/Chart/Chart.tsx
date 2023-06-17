import React from 'react'
import styles from './chart.module.scss'
import { ScaleX } from './ScaleX/ScaleX'
import { ScaleY } from './ScaleY/ScaleY'
import { Bar } from './Bar/Bar'

export const Chart = () => {
    return (
        <div className={styles.chartContainer}>
            <ScaleY />
            <ScaleX />
            <Bar />
        </div>
    )
}


