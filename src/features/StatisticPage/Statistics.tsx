import { useEffect, useState } from "react";
import Select from "../../ui/Select/Select";
import styles from './statistic.module.scss'
import { IntervalTimeProps, getIntervalTime } from "../../constants";
import { useStatistic } from "../../hooks/useStatistic";
import { useTranslation } from 'react-i18next';
import { useTheme } from "../../hooks/useTheme";
import { Header } from "../Common/Header/Header";
import { InfoBlock } from "./infoBlock/InfoBlock";


export function Statistics() {
    const { theme } = useTheme();
    const { t } = useTranslation();
    const intervalTime = getIntervalTime(t);
    const [selectedInterval, setSelectedInterval] = useState<IntervalTimeProps>({ id: 'thisWeek', value: t("this_week") });
    const { tasksGroupedByDay } = useStatistic({ selectedInterval });

    const handleIntervalChange = (selected: IntervalTimeProps) => {
        setSelectedInterval(selected);
    };

    useEffect(() => {
        document.body.setAttribute("data-theme", theme);
    }, [theme]);

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