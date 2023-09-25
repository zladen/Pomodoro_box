import styles from './menuItemsList.module.scss';
import { Button } from '../../../../ui/Button/Button';
import { t } from 'i18next';
import { useSelector } from 'react-redux';
import { selectTasksArray } from '../../Tasks';
import React from 'react';

export interface menuItem {
	className: string;
	label: string;
	icon: JSX.Element;
	onClick: () => void;
	taskId?: string;
}
export interface Props {
	menuItems: menuItem[];
	taskId?: string;
}

export function MenuItemsList({ menuItems, taskId }: Props) {
	const tasks = useSelector(selectTasksArray);
	const taskDuration = (() => {
		const task = tasks.find(task => task.id === taskId);
		return task ? task.duration : 0;
	});

	return (
		<div className={styles.dropdownMenu}>
			<div className={styles.triangleMenu}></div>
			<ul className={styles.menuItemsList}>
				{menuItems.map((item, index) => (
					<li className={styles.menuItem} key={index} >
						<Button 
							id={taskId} 
							className={
								`${styles.buttonItem} 
								 ${item.label === t("zoom_out") 
								 && taskDuration() 
								 <= 1 ? styles.disabled : ""}`}  
							icon={React.cloneElement(item.icon, {
								className: taskDuration() <= 1 ? styles.disabledIcon : ""
							})} 
							label={item.label} 
							onClick={item.onClick}
						/>
					</li>
				))}
			</ul>
		</div>
	);
}