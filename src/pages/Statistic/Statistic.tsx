import { Header } from "../../components/Header";
import { Menu } from "../../components/Menu";
import { Dropdown } from "./components/Dropdown";
import { InfoBlock } from "./components/infoBlock";

import styles from './statistic.module.scss'

export function Statistic() {
    
    return (
        <>
            <Header />
            <div className={styles.container}>
                <div className={styles.active}>
                    <h1 className={styles.title}>Ваша активность</h1>
                    <div className={styles.blockMenu}>

                    </div>
                </div>
                <InfoBlock/>
            </div>
        </>
    )
}