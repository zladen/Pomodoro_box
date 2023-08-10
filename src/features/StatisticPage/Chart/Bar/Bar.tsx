import React, { useEffect, useState } from 'react';
import styles from './bar.module.scss';
import classNames from 'classnames';

export interface IBar {
    activeBar: string;
    onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
    days: { 
        day: string; 
        tomatoes: number;
        stops: number;
    }[];
}

export const Bar = ({activeBar, onClick, days}: IBar) => {
    // Найдите максимальное количество помидоров среди всех дней
    const maxTomatoes = Math.max(...days.map(day => day.tomatoes));
    const barHeight = 41.5; // Высота вашего контейнера столбика
    const columnHeight = (tomatoes: number) => (tomatoes / maxTomatoes) * barHeight;
    //const columnHeight = (tomatoes: number) => barHeight - (tomatoes / maxTomatoes) * barHeight;

    return (
        <div className={styles.bar}>
            <div className={styles.barWrapper}>
            {days.map(day => (
                <div
                    key={day.day}
                    id={day.day}
                    onClick={onClick}
                    className={classNames(styles.column, { [styles.activeClass]: day.day === activeBar })}
                    style={{ height: `${columnHeight(day.tomatoes)}vh` }}
                />
            ))}
            </div>
        </div>
    )
}
