import { useState } from "react";
import { Header } from "../../features/Common/Header";
import Select from "../../ui/Select/Select";
import { InfoBlock } from "./infoBlock";
import styles from './statistic.module.scss'
import { IntervalTimeProps, intervalTime } from "../../constants";
import { useStatistic } from "../../hooks/useStatistic";


export function Statistic() {
    const [selectedInterval, setSelectedInterval] = useState<IntervalTimeProps>({ id: 'thisWeek', value: 'Эта неделя' });
    const { tasksGroupedByDay } = useStatistic({ selectedInterval });

    const handleIntervalChange = (selected: IntervalTimeProps) => {
        setSelectedInterval(selected);
    };

    return (
        <>
            <Header />
            <div className={styles.container}>
                <div className={styles.active}>
                    <h1 className={styles.title}>Ваша активность</h1>
                    <div className={styles.selectContainer}>
                        <Select
                            intervalTime={intervalTime}
                            onSelect={handleIntervalChange}
                        />
                    </div>
                </div>
                <InfoBlock selectedInterval={selectedInterval} tasksData={tasksGroupedByDay} />
            </div>
        </>
    )
}