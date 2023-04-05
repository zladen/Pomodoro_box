import { Header } from "../Header";
import { InfoBlock } from "../infoBlock";
import styles from './statistic.module.scss'

export function Statistic() {
    
    return (
        <>
            <Header />
            <div className={styles.container}>
                <div className={styles.active}>
                    <span className={styles.activeTitle}>Ваша активность</span>
                </div>
                <InfoBlock/>  
            </div>
        </>
    )
}