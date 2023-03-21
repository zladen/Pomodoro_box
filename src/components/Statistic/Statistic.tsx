import { Header } from "../Header";
import { EIcons, Icons } from "../Icons";
import { InfoBlock } from "../infoBlock";
import { Menu, menuItemsStatic } from "../Menu";
import styles from './statistic.module.scss'

export function Statistic() {
    
    return (
        <>
            <Header />
            <div className={styles.container}>
                <div className={styles.active}>
                    <span className={styles.activeTitle}>Ваша активность</span>
                    <Menu 
                        buttonLabel='Эта неделя' 
                        buttonClass={styles.newButtonClass} 
                        nameIcon={EIcons.arrow} 
                        menuItems={menuItemsStatic}
                    />
                </div>
                <InfoBlock/>  
            </div>
        </>
    )
}