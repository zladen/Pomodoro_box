import styles from './menu.module.scss';
import { Dropdown } from '../Dropdown';
import { MenuItemsList } from './MenuItemsList';
import { EIcons, Icons } from '../Icons';
import { Button } from '../Button/Button';
import { Modal } from '../Modal';
import { useState, useTransition } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTime, RootState } from '../../store/reducers/tasksSlice';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';


interface IMenu {
	buttonClass?: string;
	nameIcon?: EIcons;
	buttonLabel?: string;
	onClick?: () => void;
	taskId?: string;
	onEditNameTask?: () => void;
}

export function Menu(props: IMenu) {
	const [isModalOpened, setIsModalOpened] = useState(false);
	const { t } = useTranslation();
	//const lang = i18next.t.bind(i18next);

	const tasks = useSelector((state: RootState) => state.tasks.tasks);
	const pomodoro = useSelector((state: RootState) => state.settings.pomodoro)
	//const tomato = useSelector((state: RootState) => state.tasks.tomato)
	const dispatch = useDispatch();
	const id = props.taskId;

	const handleAddTimeTask = () => {
		const task = tasks.find((task) => task.id === id);
		if (task) {
				const updatedTask = {
				...task,
				pomodoro: task.pomodoro + pomodoro,
				//counterPomodoro: task.workTime / pomodoro,
			};
			dispatch(addTime(updatedTask));
		}
	}

	const handleShortTimeTask = () => {
		const task = tasks.find((task) => task.id === id);
		if (task && task.pomodoro > pomodoro) {
			const updatedTask = {
				...task,
				pomodoro: task.pomodoro - pomodoro,
				//tomato: task.time / pomodoro
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
		{ 
			label: t("incr"), 
			icon: <Icons name={EIcons.plus} />, 
			onClick:() => handleAddTimeTask(), 
			className: 'menuItem',  
		},

		{ 
			label: t("decr"), 
			icon: <Icons name={EIcons.minus} />, 
			onClick: () => handleShortTimeTask(), 
			className: 'menuItem', 
		},

		{ 
			label: t("edit"), 
			icon: <Icons name={EIcons.edit} />, 
			onClick:() => handleEditNameTask(), 
			className: 'menuItem' 
		},
		{ 
			label: t("remove"), 
			icon: <Icons name={EIcons.del} />, 
			onClick: () => setIsModalOpened(true), 
			className: 'menuItem' 
		},
	];

	return (
		<div className={styles.dropdownMenuBtn}>
			<Dropdown 
				button={<Button icon={<Icons name={EIcons.menu} />}/>}
				language={i18next.language}
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

