import styles from './menu.module.scss';
import { Dropdown } from '../Dropdown';
import { menuItem, MenuItemsList } from './MenuItemsList';
import { EIcons, Icons } from '../Icons';
import { Button } from '../Button/Button';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeTask } from '../../store/reducers/tasksSlice';


interface IMenu {
	buttonClass?: string;
	nameIcon?: EIcons;
	buttonLabel?: string;
	menuItems: menuItem[];
	onMainItemClick?: () => void;
}

const handleIncrease = () => {
	console.log('Увеличить');
};

const handleDecrease = () => {
	console.log('Уменьшить');
};

const handleEdit = () => {
	console.log('Редактировать');
};


// const handleTaskRemove = (id: string) => {
// 	const dispatch = useDispatch();
// 	dispatch(removeTask({ id }));
// };

const handleDelete = () => {
	console.log('Удалить');
};

export const menuItemsPomodoro = [
	{ label: 'Увеличить', icon: <Icons name={EIcons.plus} />, onClick: handleIncrease, className: 'menuItem' },
	{ label: 'Уменьшить', icon: <Icons name={EIcons.minus} />, onClick: handleDecrease, className: 'menuItem' },
	{ label: 'Редактировать', icon: <Icons name={EIcons.edit} />, onClick: handleEdit, className: 'menuItem' },
	{ label: 'Удалить', icon: <Icons name={EIcons.del} />, onClick: handleDelete, className: 'menuItem' },
];

export const menuItemsStatic = [
	{ label: 'Эта неделя неделя', className: 'menuItemStatistic'},
	{ label: 'Прошедшая неделя', className: 'menuItemStatistic'},
	{ label: 'Две недели назад', className: 'menuItemStatistic'},
];

export function Menu(props: IMenu) {

	return (
		<div className={styles.menu}>
			<Dropdown
					button={<Button label={props.buttonLabel} 
					className={`${props.buttonClass}`} 
					icon={<Icons name={props.nameIcon} />}
				/>}	
			>	
				<MenuItemsList 
					menuItems={props.menuItems} 
				/>		
			</Dropdown>
		</div>
	);
}



