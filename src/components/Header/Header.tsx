import React, { useState } from 'react'
import { StatisticLink } from '../StatisticLink'
import { Logo } from '../Logo'
import styles from './header.module.scss'
import { EIcons, Icons } from '../Icons'
import { Button } from '../Button/Button'
import { ModalSetting } from '../ModalSettings/ModalSettings'

export function Header() {
    const [isModalSettingOpened, setIsModalSettingOpened] = useState(false);

    const onClick = () => {
        setIsModalSettingOpened(true)
    };

	return (
        <header className={styles.header}>
            <div className={styles.container}>
                <Logo />
                <Button icon={<Icons name={EIcons.settings} />} onClick={onClick}/>
                <StatisticLink />
                {isModalSettingOpened && (
                    <ModalSetting onClose={() => { setIsModalSettingOpened(false) }} />
                )}
            </div>
        </header>
	)
}