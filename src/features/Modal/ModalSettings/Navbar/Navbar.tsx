import React, { useState } from 'react'
import styles from './navbar.module.scss';
import { useTranslation } from 'react-i18next';

interface INavbar {
    onTabClick: (tab: string) => void;
    activeTab: string;
}

export const Navbar = ({onTabClick, activeTab}: INavbar) => {
    const { t } = useTranslation();

    return (
        <div className={styles.cNav}> 
            <div data-setting="timer-config-timer"
                onClick={() => onTabClick('timer')} 
                className={`${styles.cNavItem} ${activeTab === 'timer' && styles.cNavItemActive}`}> 
                {t("timer")} 
            </div> 
            <div data-setting="timer-config-notify" 
                onClick={() => onTabClick('notify')}
                className={`${styles.cNavItem} ${activeTab === 'notify' && styles.cNavItemActive}`} > 
                {t("notify")} 
            </div> 
            <div data-setting="timer-config-app" 
                className={`${styles.cNavItem} ${activeTab === 'app' && styles.cNavItemActive}`} 
                onClick={() => onTabClick('app')}> 
                {t("app")} 
            </div> 
        </div>
    )
}
