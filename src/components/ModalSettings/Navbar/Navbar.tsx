import React, { useState } from 'react'
import styles from './navbar.module.scss';
import { useTranslation } from 'react-i18next';

// interface INavbar {
//     activeTab: string;
//     onTabClick: (tab: string) => void;
// }

interface INavbar {
    onTabClick: (tab: string) => void;
    activeTab: string;
}

export const Navbar = ({onTabClick, activeTab}: INavbar) => {
    const { t } = useTranslation();
    const [active, setActive] = useState('timer');

    const handleItemClick = (item: string) => {
        setActive(item);
        console.log('click');
    }

    return (
        <div className={styles.cNav}> 
            <div data-test="timer-config-timer"
                onClick={() => onTabClick('timer')} 
                className={`${styles.cNavItem} ${activeTab === 'timer' && styles.cNavItemActive}`}> 
                {t("timer")} 
            </div> 
            <div data-test="timer-config-notify" 
                onClick={() => onTabClick('notify')}
                className={`${styles.cNavItem} ${activeTab === 'notify' && styles.cNavItemActive}`} > 
                {t("notify")} 
            </div> 
            <div data-test="timer-config-app" 
                className={`${styles.cNavItem} ${activeTab === 'app' && styles.cNavItemActive}`} 
                onClick={() => onTabClick('app')}> 
                {t("app")} 
            </div> 
        </div>
    )
}
