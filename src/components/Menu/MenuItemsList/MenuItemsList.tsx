import styles from './menuItemsList.module.scss';
import { EIcons, Icons } from '../..//Icons';
import { Button } from '../../Button/Button';
import { Modal } from '../../Modal';
import { SetStateAction, useState } from 'react';

export interface menuItem {
	className: string;
	label: string;
	icon: JSX.Element;
	onClick: () => void;
}
export interface Props {
	menuItems: menuItem[];
}

export function MenuItemsList({ menuItems }: Props) {
	
	return (
		<div className={styles.dropdown}>
			<div className={styles.triangle}></div>
			<ul className={styles.menuItemsList}>
				{menuItems.map((item, index) => (
					<li className={styles[item.className]} key={index} onClick={item.onClick}>
						<Button className={styles.buttonItem} icon={item.icon} label={item.label} />
					</li>
				))}
			</ul>
		</div>
	);
}
