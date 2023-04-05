import styles from './menu.module.scss';
import { Dropdown } from '../Dropdown';
import { MenuItemsList } from './MenuItemsList';
import { EIcons, Icons } from '../Icons';
import { Button } from '../Button/Button';
import { Modal } from '../Modal';
import { useState } from 'react';

interface IMenu {
	buttonClass?: string;
	nameIcon?: EIcons;
	buttonLabel?: string;
	// menuItems: menuItem[];
	onClick?: () => void;
	taskId?: string;
}

export function Menu(props: IMenu) {
	const [isModalOpened, setIsModalOpened] = useState(false);
	
	const menuItemsPomodoro = [
		{ label: 'Увеличить', icon: <Icons name={EIcons.plus} />, className: 'menuItem',  },
		{ label: 'Уменьшить', icon: <Icons name={EIcons.minus} />, className: 'menuItem' },
		{ label: 'Редактировать', icon: <Icons name={EIcons.edit} />, className: 'menuItem' },
		{ label: 'Удалить', icon: <Icons name={EIcons.del} />, onClick: () => setIsModalOpened(true), className: 'menuItem' },
	];


	return (
		<div className={styles.dropdownMenuBtn}>
			<Dropdown 
				button={<Button icon={<Icons name={EIcons.menu} />}/>}
			>	
				<MenuItemsList 
					// menuItems={props.menuItems} 
					menuItems={menuItemsPomodoro}
					taskId={props.taskId} 
				/>	
			</Dropdown>
			{isModalOpened && (
                <Modal id={props.taskId} onClose={() => { setIsModalOpened(false); }} />
            )}
		</div>
	);
}


