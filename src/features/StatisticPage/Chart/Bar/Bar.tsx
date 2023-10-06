import React from 'react';
import styles from './bar.module.scss';
import classNames from 'classnames';
import { WeekDaysResult } from '../../../../constants';

export interface IBar {
    activeBar: string;
    onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
    days: WeekDaysResult;
}

export const Bar = ({activeBar, onClick, days}: IBar) => {
    const maxTomatoes = Math.max(...Object.values(days).map(day => day.tomatoes));
    const barHeight = 41.5;
    const columnHeight = (tomatoes: number) => (tomatoes / maxTomatoes) * barHeight;

    return (
        <div className={styles.bar}>
            <div className={styles.barWrapper}>
                {Object.entries(days).map(([dayKey, dayData]) => (
                    <div
                        key={dayKey}
                        id={dayKey}
                        onClick={onClick}
                        className={classNames(
                            styles.column, 
                            { 
                                [styles.activeClass]: dayKey === activeBar,
                                [styles.barNoData]: dayData.tomatoes === 0
                            }
                        )}
                        style={{ height: dayData.tomatoes !== 0 ? `${columnHeight(dayData.tomatoes)}vh` : 'auto' }}
                    />
                ))}
            </div>
        </div>
    )
}
