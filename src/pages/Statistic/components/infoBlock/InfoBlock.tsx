import { Chart } from '../Chart/Chart'
import { DataBlock } from '../DataBlock/DataBlock'
import { EIcons, Icons } from '../Icons'
import styles from './infoBlock.module.scss'



export function InfoBlock() {

    return (
        <div className={styles.statistic}>
            <div className={styles.statisticChart}>
                <div className={styles.activeWorks}>
                    <DataBlock 
                        title={"Суббота"} 
                        className={styles.dayWeek}
                    />
                    <DataBlock 
                        icon={<Icons name={EIcons.tomato}/>} 
                        className={styles.countTomato}
                    />
                </div>
                <Chart />
            </div>
            <div className={styles.blockStopped}>
                <DataBlock 
                    title={"Фокус"} 
                    icon={<Icons 
                    name={EIcons.focus}/>} 
                    className={styles.container}
                />
                <DataBlock 
                    title={"Время на паузе"} 
                    icon={<Icons name={EIcons.paused}/>} 
                    className={styles.container}
                />
                <DataBlock 
                    title={"Остановки"} 
                    icon={<Icons name={EIcons.stopped}/>} 
                    className={styles.container}
                />
            </div>
        </div>
        
    )
}