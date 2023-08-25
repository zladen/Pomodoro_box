import styles from './chart.module.scss'
import { ScaleX } from './ScaleX/ScaleX'
import { ScaleY } from './ScaleY/ScaleY'
import { Bar } from './Bar/Bar'
import { WeekDaysResult } from '../../../constants';

interface IChart {
    activeBar: string;
    onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
    data: WeekDaysResult;
}

export const Chart = ({activeBar, onClick, data}: IChart) => {
    
    return (
        <div className={styles.chartContainer}>
            <ScaleY />
            <ScaleX  activeBar={activeBar} onClick={onClick} days={data} />
            <Bar activeBar={activeBar} onClick={onClick} days={data}/>
        </div>
    )
}


