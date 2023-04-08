import styles from './menu.module.scss';
import { Dropdown } from '../Dropdown';
import { MenuItemsList } from './MenuItemsList';
import { EIcons, Icons } from '../Icons';
import { Button } from '../Button/Button';
import { Modal } from '../Modal';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTime, editTask, RootState } from '../../store/reducers/tasksSlice';


interface IMenu {
	buttonClass?: string;
	nameIcon?: EIcons;
	buttonLabel?: string;
	//menuItems: menuItem[];
	onClick?: () => void;
	taskId?: string;
	onEditNameTask?: () => void;
}

export function Menu(props: IMenu) {
	const [isModalOpened, setIsModalOpened] = useState(false);

	const tasks = useSelector((state: RootState) => state.tasks.tasks);
	const dispatch = useDispatch();
	const id = props.taskId;

	const handleAddTimeTask = () => {
		const task = tasks.find((task) => task.id === id);
		if (task) {
				const updatedTask = {
				...task,
				time: task.time + 25,
			};
			dispatch(addTime(updatedTask));
		}
	}

	const handleShortTimeTask = () => {
		const task = tasks.find((task) => task.id === id);
		if (task && task.time > 25) {
			const updatedTask = {
				...task,
				time: task.time - 25,
			};
			dispatch(addTime(updatedTask));
		}
	}

	const handleEditNameTask = () => {
		// вызываем проп onEditNameTask
		if (props.onEditNameTask) {
		  	props.onEditNameTask();
		}
	};

	const menuItemsPomodoro = [
		{ label: 'Увеличить', icon: <Icons name={EIcons.plus} />, onClick:() => handleAddTimeTask(), className: 'menuItem',  },
		{ label: 'Уменьшить', icon: <Icons name={EIcons.minus} /> , onClick: () => handleShortTimeTask(), className: 'menuItem' },
		{ label: 'Редактировать', icon: <Icons name={EIcons.edit} />, onClick:() => handleEditNameTask(), className: 'menuItem' },
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

