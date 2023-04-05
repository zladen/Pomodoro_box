import { EIcons, Icons } from '../Icons'
import styles from './infoBlock.module.scss'


export function InfoBlock() {

    return (
        <div className={styles.statistic}>
            <div>
                <div className={styles.day}>
                    <span className={styles.titleDay}>Суббота</span>
                    <span className={styles.dataDay}>Нет данных</span>
                </div>
                <div className={styles.tomato}>
                    <Icons name={EIcons.tomato}/>
                </div>
            </div>
            <div className={styles.schedule}>
            </div>
        </div>
        
    )
}