import { useEffect, useState } from 'react';
import { Chart } from '../Chart/Chart'
import { DataBlock } from '../DataBlock/DataBlock'
import { EIcons, Icons } from '../Icons'
import { IBar } from '../Chart/Bar/Bar'
import styles from './infoBlock.module.scss'


export function InfoBlock() {
    const [activeBar, setActiveBar] = useState('');
    const [tomato, setTomato] = useState(0)
    const [activeDayStops, setActiveDayStops] = useState(0); 

    const days = [
        { day: 'mon', tomatoes: 2, stops: 4 },
        { day: 'tue', tomatoes: 6, stops: 8 },
        { day: 'wed', tomatoes: 4, stops: 3 },
        { day: 'thu', tomatoes: 3, stops: 4 },
        { day: 'fri', tomatoes: 8, stops: 7 },
        { day: 'sat', tomatoes: 1, stops: 5 },
        { day: 'sun', tomatoes: 0, stops: 0 },
    ];

    const clickBar = (event: React.MouseEvent<HTMLDivElement>) => {
        setActiveBar(event.currentTarget.id);
        //console.log(event.currentTarget.id);
        const selectedDay = days.find(day => day.day === event.currentTarget.id);
        setActiveDayStops(selectedDay?.stops || 0);
        setTomato(selectedDay?.tomatoes || 0);
    }

    useEffect(() => {
        const days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
        const today = new Date().getDay();
        setActiveBar(days[today]);

        const selectedDay = days.find(day => day === days[today]);
        setActiveDayStops(selectedDay?.stops || 0);
        setTomato(selectedDay?.tomatoes || 0);
    }, []);

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
                        value={tomato}
                    />
                </div>
                <Chart 
                    activeBar={activeBar} 
                    onClick={clickBar} data={days}
                />
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
                    value={activeDayStops}
                />
            </div>
        </div>
        
    )
}