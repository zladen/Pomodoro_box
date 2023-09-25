import { useState } from "react";
import { Header } from "../Common/Header";
import Select from "../../ui/Select/Select";
import { InfoBlock } from "./infoBlock";
import styles from './statistic.module.scss'
import { IntervalTimeProps, getIntervalTime } from "../../constants";
import { useStatistic } from "../../hooks/useStatistic";
import { useTranslation } from 'react-i18next';


export function Statistics() {
    const { t } = useTranslation();
    const intervalTime = getIntervalTime(t);
    const [selectedInterval, setSelectedInterval] = useState<IntervalTimeProps>({ id: 'thisWeek', value: t("this_week") });
    const { tasksGroupedByDay } = useStatistic({ selectedInterval });

    const handleIntervalChange = (selected: IntervalTimeProps) => {
        setSelectedInterval(selected);
    };

    return (
        <>
            <Header />
            <div className={styles.container}>
                <div className={styles.active}>
                    <h1 className={styles.title}>{t("your_activity")}</h1>
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