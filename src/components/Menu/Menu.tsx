import styles from './menu.module.scss';
import { Dropdown } from '../Dropdown';
import { MenuItemsList } from './MenuItemsList';
import { EIcons, Icons } from '../Icons';
import { Button } from '../Button/Button';
import { ModalRemoveTask } from '../ModalRemoveTask';
import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, updateTask, updateTime } from '../../store/reducers/tasksSlice';
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

	const tasks = useSelector((state: RootState) => Object.values(state.tasks.tasks));
	const pomodoro = useSelector((state: RootState) => state.config.pomodoro)
	const dispatch = useDispatch();
	const id = props.taskId;
	const task = tasks.find((task) => task.id === id);
	
	const handleAddPomodoro = () => {
		if (task) {
				const updated = {
				...task,
				duration: task.duration + (pomodoro / 60),
			};
			dispatch(updateTask(updated));
		}
	}

	const handleShortPomodoro = () => {
		if (task && task.duration > pomodoro / 60) {
			const updated = {
				...task,
				duration: task.duration - (pomodoro / 60),
			};
			dispatch(updateTask(updated));
		}
	}

	const handleEditNameTask = () => {
		if (props.onEditNameTask) {
		  	props.onEditNameTask();
		}
	};

	const menuItemsPomodoro = [
		{ 
			label: t("incr"), 
			icon: <Icons name={EIcons.plus} />, 
			onClick:() => handleAddPomodoro(), 
			className: 'menuItem',  
		},

		{ 
			label: t("decr"), 
			icon: <Icons name={EIcons.minus} />, 
			onClick: () => handleShortPomodoro(), 
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
					menuItems={menuItemsPomodoro}
					taskId={props.taskId} 
				/>	
			</Dropdown>
			{isModalOpened && (
                <ModalRemoveTask id={props.taskId} onClose={() => { setIsModalOpened(false); }} />
            )}
		</div>
	);
}

