import { useEffect, useState } from 'react';
import { Chart } from '../Chart/Chart'
import { DataBlock } from '../DataBlock/DataBlock'
import { EIcons, Icons } from '../../../ui/Icons/Icons'
import styles from './infoBlock.module.scss'
import { IntervalTimeProps, WeekDaysResult, defaultStatisticData } from '../../../constants';
import { TimeFilter } from '../../../hooks/useStatistic';
import { formatedDuration } from '../../../utils/helpers/formatedDuration';
import { CardWorkTime } from './Cards/CardWorkTime/CardWorkTime';
import { I18nextProvider, useTranslation } from 'react-i18next';
import i18n from '../../../lib/i18n';
import { CardTomatoes } from './Cards/CardTomatoes/CardTomatoes';


export interface InfoBlockProps {
    selectedInterval?: IntervalTimeProps;
    tasksData: WeekDaysResult | undefined;
}

export function InfoBlock({ tasksData, selectedInterval }: InfoBlockProps) {
    const { t } = useTranslation();
    const [activeBar, setActiveBar] = useState('');
    const [tomato, setTomato] = useState(0)
    const [activeDayStops, setActiveDayStops] = useState(0);
    const [timePaused, setTimePaused] = useState(0);
    const [totalTime, setTotalTime] = useState(0);
    const [focus, setFocus] = useState(0); 

    const clickBar = (event: React.MouseEvent<HTMLDivElement>) => {
        setActiveBar(event.currentTarget.id);
        const selectedDay = tasksData && tasksData[event.currentTarget.id];
        if (selectedDay) {
            setActiveDayStops(selectedDay.stopped);
            setTimePaused(selectedDay.paused);
            setFocus(selectedDay.focus);
            setTotalTime(selectedDay.totalTime)
            setTomato(selectedDay.tomatoes);
        }
    };

    useEffect(() => {
        const days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
        const defaultDay = "mon";
        let currentDay: string = defaultDay;
    
        if (selectedInterval?.id === TimeFilter.THIS_WEEK) {
            currentDay = days[new Date().getDay()];
        } else {
            if (tasksData) {
                currentDay = Object.keys(tasksData).reduce((maxDay, day) => 
                    tasksData[day].tomatoes > tasksData[maxDay].tomatoes ? day : maxDay, "mon"
                );
            }
        }
            
        setActiveBar(currentDay);
        
        const currentDayData = tasksData && tasksData[currentDay];
        if (currentDayData) {
            setActiveDayStops(currentDayData.stopped);
            setTimePaused(currentDayData.paused);
            setFocus(currentDayData.focus);
            setTotalTime(currentDayData.totalTime);
            setTomato(currentDayData.tomatoes);
        }
    }, [selectedInterval, tasksData]);

    const getDayName = (dayId: string): string => {
        const dayNames: { [key: string]: string } = {
            'mon': t("mon"),
            'tue': t("tue"),
            'wed': t("wed"),
            'thu': t("thu"),
            'fri': t("fri"),
            'sat': t("sat"),
            'sun': t("sun"),
        };
    
        return dayNames[dayId] || '';
    }

    return (
        <div className={styles.statistic}>
            <div className={styles.statisticChart}>
                <div className={styles.activeWorks}>
                    <CardWorkTime 
                        title={getDayName(activeBar)}
                        className={styles.cardWorkTime}
                        value={formatedDuration(totalTime)}
                    />
                    <CardTomatoes 
                        className={styles.cardTomatoes}
                        value={tomato}
                    />
                </div>
                <Chart 
                    activeBar={activeBar} 
                    onClick={clickBar} 
                    data={tasksData || defaultStatisticData}
                />
            </div>
            <div className={styles.blockStopped}>
                <DataBlock 
                    title={"Фокус"} 
                    icon={<Icons name={EIcons.focus}/>} 
                    className={styles.cardFocus}
                    value={`${focus}%`}
                />
                <DataBlock 
                    title={"Время на паузе"} 
                    icon={<Icons name={EIcons.paused}/>} 
                    className={styles.cardPaused}
                    value={formatedDuration(timePaused)}
                />
                <DataBlock 
                    title={"Остановки"} 
                    icon={<Icons name={EIcons.stopped}/>} 
                    className={styles.cardStopped}
                    value={activeDayStops}
                />
            </div>
        </div>
    )
}