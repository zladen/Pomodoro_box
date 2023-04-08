import styles from './menuItemsList.module.scss';
import { Button } from '../../Button/Button';
export interface menuItem {
	className: string;
	label: string;
	icon: JSX.Element;
	onClick: () => void;
	taskId?: string;
	id?: string;
}
export interface Props {
	menuItems: menuItem[];
	taskId?: string;
}

export function MenuItemsList({ menuItems, taskId }: Props) {

	return (
		<div className={styles.dropdownMenu}>
			<div className={styles.triangleMenu}></div>
			<ul className={styles.menuItemsList}>
				{menuItems.map((item, index) => (
					<li className={styles.menuItem} key={index} >
						<Button id={taskId} className={styles.buttonItem} icon={item.icon} label={item.label} onClick={item.onClick}/>
					</li>
				))}
			</ul>
		</div>
	);
}