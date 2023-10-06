import { useEffect, useState } from 'react';
import { Chart } from '../Chart/Chart'
import { DataBlock } from '../DataBlock/DataBlock'
import styles from './infoBlock.module.scss'
import { IntervalTimeProps, WeekDaysResult, defaultStatisticData } from '../../../constants';
import { TimeFilter } from '../../../hooks/useStatistic';
import { universalFormatter } from '../../../utils/helpers/universalFormatter';
import { CardWorkTime } from './Cards/CardWorkTime/CardWorkTime';
import { I18nextProvider, useTranslation } from 'react-i18next';
import i18n from '../../../lib/i18n';
import { CardTomatoes } from './Cards/CardTomatoes/CardTomatoes';
import { daysOfWeek } from '../../../constants';
import { FocusIcon, PausedIcon, StoppedIcon } from '../../../ui/Icons';

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
        
        const defaultDay = "mon";
        let currentDay: string = defaultDay;
    
        if (selectedInterval?.id === TimeFilter.THIS_WEEK) {
            currentDay = daysOfWeek[new Date().getDay()];
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
            'mon': t("monday"),
            'tue': t("tuesday"),
            'wed': t("wednesday"),
            'thu': t("thursday"),
            'fri': t("friday"),
            'sat': t("saturday"),
            'sun': t("sunday")
        };
        return dayNames[dayId] || '';
    }

    return (
        <I18nextProvider i18n={i18n}>
            <div className={styles.statistic}>
                <div className={styles.statisticChart}>
                    <div className={styles.activeWorks}>
                        <CardWorkTime 
                            title={getDayName(activeBar)}
                            className={styles.cardWorkTime}
                            value={universalFormatter(totalTime, 'totalTimeWork', t)}
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
                        icon={<FocusIcon strokeColor={focus === 0 ? '#C4C4C4' : "#FFAE35"} />} 
                        value={`${focus}%`}
                        title={`${t("focus")}`}
                        className={`${styles.cardFocus} ${focus === 0 ? styles.cardNoData : ''}`}
                    />
                    <DataBlock 
                        title={`${t("time_paused")}`} 
                        icon={<PausedIcon strokeColor={timePaused === 0 ? '#C4C4C4' : '#9C97D7'} />} 
                        className={`${styles.cardPaused} ${timePaused === 0 ? styles.cardNoData : ''}`}
                        value={universalFormatter(timePaused, 'totalTimePaused', t) || 0 + ''}
                    />
                    <DataBlock 
                        title={`${t("stops")}`} 
                        icon={<StoppedIcon strokeColor={activeDayStops === 0 ? '#C4C4C4' : "#7FC2D7"} />} 
                        value={activeDayStops || 0}
                        className={`${styles.cardStopped} ${activeDayStops === 0 ? styles.cardNoData : ''}`}
                    />
                </div>
            </div>
        </I18nextProvider> 
    )
}