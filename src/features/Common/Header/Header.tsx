import React, { useState } from 'react'
import { StatisticLink } from './StatisticLink'
import { Logo } from './Logo'
import styles from './header.module.scss'
import { EIcons, Icons } from '../../../ui/Icons'
import { Button } from "../../../ui/Button/Button";
import { ModalSetting } from '../../Modal/ModalSettings/ModalSettings'
import { useLocation, useNavigate } from 'react-router'

export function Header() {
    const [isModalSettingOpened, setIsModalSettingOpened] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const handleSettingsClick = () => {
        setIsModalSettingOpened(true)
        if (location.pathname === '/') {
            navigate('/settings');
        } else {
            navigate(`${location.pathname}/settings`);
        }
    };

	return (
        <header className={styles.header}>
            <div className={styles.container}>
                <Logo />
                <Button icon={<Icons name={EIcons.settings} />} onClick={handleSettingsClick}/>
                <StatisticLink />
                {isModalSettingOpened && (
                    <ModalSetting onClose={() => { setIsModalSettingOpened(false) }} />
                )}
            </div>
        </header>
	)
}