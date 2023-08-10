import styles from './chart.module.scss'
import { ScaleX } from './ScaleX/ScaleX'
import { ScaleY } from './ScaleY/ScaleY'
import { Bar } from './Bar/Bar'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store/reducers/historySlice'

interface IChart {
    activeBar: string;
    onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
    data: { day: string; tomatoes: number; stops: number}[];
}

export const Chart = ({activeBar, onClick, data}: IChart) => {

    const historyData = useSelector((state: RootState) => state.history.data);
    const tasksArray = Object.values(historyData);
    //console.log(tasksArray);

    
    return (
        <div className={styles.chartContainer}>
            <ScaleY />
            <ScaleX  activeBar={activeBar} onClick={onClick} days={[]} />
            <Bar activeBar={activeBar} onClick={onClick} days={data}/>
        </div>
    )
}


