import { Header } from "../../features/Common/Header";
import Select from "../../ui/Select/Select";
import { InfoBlock } from "./infoBlock";
import styles from './statistic.module.scss'

export function Statistic() {

    // const handleSelect = (item: any) => {
    //     console.log('Selected Item', item);
    // }
    
    return (
        <>
            <Header />
            <div className={styles.container}>
                <div className={styles.active}>
                    <h1 className={styles.title}>Ваша активность</h1>
                    <div className={styles.selectContainer}>
                        <Select
                            data={[
                                { id: 'thisWeek', value: 'Эта неделя' },
                                { id: 'pastWeek', value: 'Прошедшая неделя' },
                                { id: 'twoWeeksAgo', value: '2 недели назад' },
                            ]}
                            //onSelect={handleSelect}
                        />
                    </div>
                </div>
                <InfoBlock/>
            </div>
        </>
    )
}